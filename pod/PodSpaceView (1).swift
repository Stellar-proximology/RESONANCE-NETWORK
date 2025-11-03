import SwiftUI

struct PodSpaceView: View {
    let pod: Pod
    @AppStorage("userId") private var userId = ""
    @State private var members: [PodMember] = []
    @State private var messages: [PodMessage] = []
    @State private var newMessage = ""
    @State private var isLoading = true
    @State private var selectedTab = 0
    
    var body: some View {
        ZStack {
            ThemeManager.background
                .ignoresSafeArea()
            
            VStack(spacing: 0) {
                // Pod Header
                PodHeaderView(pod: pod)
                
                // Tab Selector
                Picker("Tab", selection: $selectedTab) {
                    Text("Chat").tag(0)
                    Text("Members").tag(1)
                    Text("Insights").tag(2)
                }
                .pickerStyle(SegmentedPickerStyle())
                .padding(.horizontal, 20)
                .padding(.vertical, 10)
                
                // Tab Content
                TabView(selection: $selectedTab) {
                    // Chat Tab
                    ChatView(
                        messages: messages,
                        newMessage: $newMessage,
                        onSendMessage: sendMessage
                    )
                    .tag(0)
                    
                    // Members Tab
                    MembersView(members: members)
                        .tag(1)
                    
                    // Insights Tab
                    InsightsView(pod: pod)
                        .tag(2)
                }
                .tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
            }
        }
        .navigationTitle(pod.name ?? "Pod")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            loadPodData()
        }
    }
    
    private func loadPodData() {
        guard let podId = pod.id else { return }
        
        Task {
            do {
                async let membersTask = NetworkService.shared.getPodMembers(podId: podId)
                async let messagesTask = NetworkService.shared.getPodMessages(podId: podId)
                
                let (fetchedMembers, fetchedMessages) = try await (membersTask, messagesTask)
                
                await MainActor.run {
                    self.members = fetchedMembers
                    self.messages = fetchedMessages
                    self.isLoading = false
                }
            } catch {
                await MainActor.run {
                    self.isLoading = false
                }
            }
        }
    }
    
    private func sendMessage() {
        guard !newMessage.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty,
              let podId = pod.id else { return }
        
        let messageText = newMessage
        newMessage = ""
        
        Task {
            do {
                let message = try await NetworkService.shared.createPodMessage(
                    podId: podId,
                    userId: userId,
                    message: messageText
                )
                
                await MainActor.run {
                    self.messages.append(message)
                }
            } catch {
                // Handle error
            }
        }
    }
}

struct PodHeaderView: View {
    let pod: Pod
    
    var body: some View {
        VStack(spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(pod.name ?? "Unknown Pod")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(ThemeManager.primaryText)
                    
                    Text(pod.resonanceTheme ?? "")
                        .font(.subheadline)
                        .foregroundColor(ThemeManager.accent)
                }
                
                Spacer()
                
                Text(pod.status?.capitalized ?? "Active")
                    .font(.caption)
                    .fontWeight(.semibold)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(ThemeManager.accent.opacity(0.2))
                    .foregroundColor(ThemeManager.accent)
                    .cornerRadius(8)
            }
            
            if let description = pod.description {
                Text(description)
                    .font(.body)
                    .foregroundColor(ThemeManager.primaryText)
                    .multilineTextAlignment(.leading)
            }
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 16)
        .background(ThemeManager.surface)
    }
}

struct ChatView: View {
    let messages: [PodMessage]
    @Binding var newMessage: String
    let onSendMessage: () -> Void
    
    var body: some View {
        VStack(spacing: 0) {
            // Messages
            ScrollView {
                LazyVStack(spacing: 12) {
                    ForEach(messages) { message in
                        MessageBubble(message: message)
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 16)
            }
            
            // Message Input
            HStack(spacing: 12) {
                TextField("Type a message...", text: $newMessage)
                    .textFieldStyle(CustomTextFieldStyle())
                
                Button(action: onSendMessage) {
                    Image(systemName: "paperplane.fill")
                        .foregroundColor(.white)
                        .padding(8)
                        .background(ThemeManager.accent)
                        .clipShape(Circle())
                }
                .disabled(newMessage.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 12)
            .background(ThemeManager.surface)
        }
    }
}

struct MessageBubble: View {
    let message: PodMessage
    @AppStorage("userId") private var userId = ""
    
    var body: some View {
        HStack {
            if isCurrentUser {
                Spacer(minLength: 50)
            }
            
            VStack(alignment: isCurrentUser ? .trailing : .leading, spacing: 4) {
                Text(message.message ?? "")
                    .font(.body)
                    .foregroundColor(isCurrentUser ? .white : ThemeManager.primaryText)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(isCurrentUser ? ThemeManager.accent : ThemeManager.surface)
                    .cornerRadius(16)
                
                Text("User \(String(message.userId?.prefix(8) ?? ""))")
                    .font(.caption2)
                    .foregroundColor(ThemeManager.secondaryText)
            }
            
            if !isCurrentUser {
                Spacer(minLength: 50)
            }
        }
    }
    
    private var isCurrentUser: Bool {
        message.userId == userId
    }
}

struct MembersView: View {
    let members: [PodMember]
    
    var body: some View {
        ScrollView {
            LazyVStack(spacing: 12) {
                ForEach(members) { member in
                    MemberCard(member: member)
                }
            }
            .padding(.horizontal, 20)
            .padding(.top, 16)
        }
    }
}

struct MemberCard: View {
    let member: PodMember
    
    var body: some View {
        HStack {
            Image(systemName: "person.circle.fill")
                .font(.title)
                .foregroundColor(ThemeManager.accent)
            
            VStack(alignment: .leading, spacing: 4) {
                Text("User \(String(member.userId?.prefix(8) ?? ""))")
                    .font(.headline)
                    .foregroundColor(ThemeManager.primaryText)
                
                if let joinedAt = member.joinedAt {
                    Text("Joined: \(formatDate(joinedAt))")
                        .font(.caption)
                        .foregroundColor(ThemeManager.secondaryText)
                }
            }
            
            Spacer()
            
            if member.leftAt == nil {
                Text("Active")
                    .font(.caption)
                    .fontWeight(.semibold)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(ThemeManager.success.opacity(0.2))
                    .foregroundColor(ThemeManager.success)
                    .cornerRadius(8)
            }
        }
        .padding()
        .background(ThemeManager.cardBackground)
        .cornerRadius(12)
    }
    
    private func formatDate(_ dateString: String) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss'Z'"
        guard let date = formatter.date(from: dateString) else { return dateString }
        
        formatter.dateFormat = "MMM d, yyyy"
        return formatter.string(from: date)
    }
}

struct InsightsView: View {
    let pod: Pod
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Cynthia's Guidance
                if let guidance = pod.cynthiaGuidance {
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Image(systemName: "sparkles")
                                .foregroundColor(ThemeManager.accent)
                            Text("Cynthia's Guidance")
                                .font(.headline)
                                .foregroundColor(ThemeManager.primaryText)
                        }
                        
                        Text(guidance)
                            .font(.body)
                            .foregroundColor(ThemeManager.primaryText)
                            .padding()
                            .background(ThemeManager.surface)
                            .cornerRadius(12)
                    }
                }
                
                // Pod Timeline
                VStack(alignment: .leading, spacing: 12) {
                    Text("Pod Timeline")
                        .font(.headline)
                        .foregroundColor(ThemeManager.primaryText)
                    
                    VStack(spacing: 8) {
                        if let startDate = pod.startDate {
                            HStack {
                                Text("Started:")
                                    .foregroundColor(ThemeManager.secondaryText)
                                Spacer()
                                Text(formatDate(startDate))
                                    .foregroundColor(ThemeManager.primaryText)
                            }
                        }
                        
                        if let endDate = pod.endDate {
                            HStack {
                                Text("Ends:")
                                    .foregroundColor(ThemeManager.secondaryText)
                                Spacer()
                                Text(formatDate(endDate))
                                    .foregroundColor(ThemeManager.primaryText)
                            }
                        }
                    }
                    .padding()
                    .background(ThemeManager.cardBackground)
                    .cornerRadius(12)
                }
                
                // Resonance Theme
                if let theme = pod.resonanceTheme {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Resonance Theme")
                            .font(.headline)
                            .foregroundColor(ThemeManager.primaryText)
                        
                        Text(theme)
                            .font(.body)
                            .foregroundColor(ThemeManager.primaryText)
                            .padding()
                            .background(ThemeManager.cardBackground)
                            .cornerRadius(12)
                    }
                }
            }
            .padding(.horizontal, 20)
            .padding(.top, 16)
        }
    }
    
    private func formatDate(_ dateString: String) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        guard let date = formatter.date(from: dateString) else { return dateString }
        
        formatter.dateFormat = "MMM d, yyyy"
        return formatter.string(from: date)
    }
}

#Preview {
    NavigationStack {
        PodSpaceView(pod: Pod(
            id: "1",
            name: "Resonance Builders",
            description: "A pod focused on cultivating deep connections",
            startDate: "2025-01-01",
            endDate: "2025-01-31",
            status: "active",
            resonanceTheme: "Creative Flow & Collaboration",
            cynthiaGuidance: "Focus on sharing your unique talents"
        ))
    }
}