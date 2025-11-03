import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useNavigate } from 'react-router-dom';
import './NetworkGraph.css';

function NetworkGraph({ userId }) {
  const svgRef = useRef();
  const navigate = useNavigate();
  const [graphData, setGraphData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);

  // Fetch network data
  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/network/graph', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            max_connections: 20,
            min_compatibility: 0.6
          })
        });

        if (!response.ok) {
          // If no data, seed mock users
          await fetch('http://localhost:8000/api/mock/seed-users');
          // Retry
          const retryResponse = await fetch('http://localhost:8000/api/network/graph', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: userId,
              max_connections: 20,
              min_compatibility: 0.6
            })
          });
          const data = await retryResponse.json();
          setGraphData(data);
        } else {
          const data = await response.json();
          setGraphData(data);
        }
      } catch (error) {
        console.error('Error fetching network:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNetwork();
  }, [userId]);

  // D3 visualization
  useEffect(() => {
    if (!graphData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Create simulation
    const simulation = d3.forceSimulation(graphData.nodes)
      .force('link', d3.forceLink(graphData.edges)
        .id(d => d.id)
        .distance(d => 150 * (1 - d.weight)))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(graphData.edges)
      .join('line')
      .attr('class', 'network-link')
      .style('stroke-width', d => 2 + d.weight * 8)
      .style('stroke', d => {
        const intensity = Math.floor(d.weight * 255);
        return `rgba(${255 - intensity}, ${intensity}, 255, ${0.3 + d.weight * 0.7})`;
      });

    // Create nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(graphData.nodes)
      .join('g')
      .attr('class', d => `network-node ${d.type}`)
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => {
        setSelectedNode(d);
        if (d.type !== 'self') {
          navigate(`/match/${d.id}`);
        }
      });

    // Node circles
    node.append('circle')
      .attr('r', d => d.type === 'self' ? 30 : 20)
      .style('fill', d => {
        if (d.type === 'self') return '#a78bfa';
        const compat = d.compatibility || 0.5;
        return `rgb(${255 * (1 - compat)}, ${100 + 155 * compat}, 255)`;
      })
      .style('stroke', d => d.type === 'self' ? '#fff' : 'rgba(255,255,255,0.5)')
      .style('stroke-width', d => d.type === 'self' ? 4 : 2);

    // Node labels
    node.append('text')
      .attr('dy', 35)
      .attr('text-anchor', 'middle')
      .style('fill', '#fff')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text(d => d.type === 'self' ? 'YOU' : `Gate ${d.dominant_gate}`);

    // Compatibility labels on hover
    node.append('title')
      .text(d => d.type === 'self' 
        ? 'Your Consciousness Node' 
        : `Compatibility: ${(d.compatibility * 100).toFixed(0)}%\nGate: ${d.dominant_gate}`);

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [graphData, navigate]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Calculating resonance field...</p>
      </div>
    );
  }

  return (
    <div className="network-container">
      <div className="network-header">
        <h2>Resonance Network</h2>
        <div className="network-stats">
          <div className="stat">
            <span className="stat-label">Connections</span>
            <span className="stat-value">{graphData?.edges.length || 0}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Avg Compatibility</span>
            <span className="stat-value">
              {graphData?.edges.length 
                ? (graphData.edges.reduce((sum, e) => sum + e.weight, 0) / graphData.edges.length * 100).toFixed(0)
                : 0}%
            </span>
          </div>
        </div>
      </div>

      <div className="network-legend">
        <div className="legend-item">
          <div className="legend-color" style={{background: '#a78bfa'}}></div>
          <span>You</span>
        </div>
        <div className="legend-item">
          <div className="legend-gradient"></div>
          <span>Low → High Compatibility</span>
        </div>
      </div>

      <svg ref={svgRef} className="network-svg"></svg>

      {selectedNode && selectedNode.type !== 'self' && (
        <div className="node-detail-overlay" onClick={() => setSelectedNode(null)}>
          <div className="node-detail-card" onClick={(e) => e.stopPropagation()}>
            <h3>Consciousness Node</h3>
            <div className="detail-row">
              <span>Dominant Gate:</span>
              <strong>{selectedNode.dominant_gate}</strong>
            </div>
            <div className="detail-row">
              <span>Compatibility:</span>
              <strong>{(selectedNode.compatibility * 100).toFixed(0)}%</strong>
            </div>
            <button 
              className="primary-btn"
              onClick={() => navigate(`/match/${selectedNode.id}`)}
            >
              View Full Match Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NetworkGraph;
