import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(e) { return { error: e } }
  render() {
    if (this.state.error) {
      return (
        <div style={{padding:40,fontFamily:'monospace',color:'#1B3A6B'}}>
          <h2>S&H Deck Planner — Error</h2>
          <pre style={{marginTop:16,padding:16,background:'#f4f6fa',borderRadius:8,fontSize:12,overflow:'auto'}}>
            {this.state.error.toString()}
          </pre>
          <button onClick={()=>window.location.reload()}
            style={{marginTop:16,padding:'10px 24px',background:'#1B3A6B',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontWeight:700}}>
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary><App /></ErrorBoundary>
)
