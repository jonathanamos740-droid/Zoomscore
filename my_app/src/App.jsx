import Navbar from "./components/Navbar"
import LiveScores from "./components/LiveScores"
import "./styles/globals.css"

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>LiveScore Football Scores</title>
        <meta name="description" content="Live football scores and match updates" />
      </head>
      <body>
        <div>
          <Navbar />
          <LiveScores />
        </div>
      </body>
    </html>
  )
}
