import "../styles/MatchCard.css"

export default function MatchCard({ match }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "LIVE":
        return "live"
      case "FT":
        return "ft"
      case "HT":
        return "ht"
      default:
        return "ft"
    }
  }

  return (
    <div className="match-card">
      <div className="match-content">
        {/* League Logo + Name */}
        <div className="league-header">
          <img
            src={match.leagueLogo}
            alt={match.league}
            className="league-logo"
          />
          <span className="league-name">{match.league}</span>
        </div>

        <div className="match-teams">
          {/* Home Team */}
          <div className="team-row">
            <div className="team-info">
              <img
                src={match.homeLogo}
                alt={match.homeTeam}
                className="team-logo home"
              />
              <span className="team-name">{match.homeTeam}</span>
            </div>
            <span className="team-score">{match.homeScore}</span>
          </div>

          {/* Away Team */}
          <div className="team-row">
            <div className="team-info">
              <img
                src={match.awayLogo}
                alt={match.awayTeam}
                className="team-logo away"
              />
              <span className="team-name">{match.awayTeam}</span>
            </div>
            <span className="team-score">{match.awayScore}</span>
          </div>
        </div>

        {/* Match Status */}
        <div className="match-status">
          <span className={`status-badge ${getStatusClass(match.status)}`}>
            {match.status}
          </span>
          {match.minute && (
            <span className="match-minute">{match.minute}'</span>
          )}
        </div>
      </div>

      {/* Favorite button */}
      <button className="favorite-button">
        <svg
          className="favorite-icon"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    </div>
  )
}
