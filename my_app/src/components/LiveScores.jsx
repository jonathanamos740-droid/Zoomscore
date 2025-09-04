"use client"

import { useState, useEffect } from "react"
import MatchCard from "./MatchCard"
import "../styles/livescores.css"
import Featured from "./Featured"

export default function LiveScores() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSport, setSelectedSport] = useState("Football")

  const fetchMatches = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        "https://api.sofascore.com/api/v1/sport/football/events/live"
      )
      const data = await response.json()
      setMatches(data?.events || [])
    } catch (error) {
      console.error("Error fetching live matches:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatches()
    const interval = setInterval(fetchMatches, 30000)
    return () => clearInterval(interval)
  }, [])

  const sports = ["Football", "Hockey", "Basketball", "Tennis", "Cricket"]

  return (
    <div className="livescores-container">
      {/* Sports Navigation */}
      <div className="sports-nav">
        <div className="sports-nav-container">
          <div className="sports-nav-list">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`sports-nav-button ${
                  selectedSport === sport ? "active" : ""
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-grid">
          {/* Matches Section */}
          <div className="matches-section">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            ) : (
              <div>
                {matches.length === 0 ? (
                  <p className="text-center mt-4">No live matches right now.</p>
                ) : (
                  <div className="matches-list">
                    {matches.map((match) => {
                      const homeLogo = match?.homeTeam?.id
                        ? `https://api.sofascore.app/api/v1/team/${match.homeTeam.id}/image`
                        : null

                      const awayLogo = match?.awayTeam?.id
                        ? `https://api.sofascore.app/api/v1/team/${match.awayTeam.id}/image`
                        : null

                      const leagueLogo = match?.tournament?.uniqueTournament?.id
                        ? `https://api.sofascore.app/api/v1/unique-tournament/${match.tournament.uniqueTournament.id}/image`
                        : null

                      return (
                        <>
                        <MatchCard
                          key={match.id}
                          match={{
                            id: match.id,
                            homeTeam: match?.homeTeam?.name || "Home",
                            awayTeam: match?.awayTeam?.name || "Away",
                            homeScore: match?.homeScore?.current ?? 0,
                            awayScore: match?.awayScore?.current ?? 0,
                            status: match?.status?.type || "unknown",
                            minute: match?.status?.description || "",
                            league: match?.tournament?.name || "Unknown League",
                            leagueLogo,
                            homeLogo,
                            awayLogo
                          }}
                        />
                     
                        </>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
          <Featured />
      </div>
    </div>
  )
}
