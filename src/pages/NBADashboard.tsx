"use client"

import { useState } from "react"

// Translations
const translations = {
  en: {
    title: "NBA 2024-2025 Season Leaders Dashboard",
    subtitle: "Track top NBA players' performance and statistics",
    language: "Language",
    overview: "Overview",
    scoring: "Scoring Leaders",
    rating: "ESPN Rating",
    teams: "Team Analysis",
    totalPlayers: "Total Players",
    avgPoints: "Average Points",
    topScorer: "Top Scorer",
    avgRating: "Avg ESPN Rating",
    thisMonth: "This season",
    vs_lastSeason: "vs last season",
    selectPosition: "Select Position",
    selectTeam: "Select Team",
    selectStat: "Select Statistic",
    allPositions: "All Positions",
    allTeams: "All Teams",
    pointsPerGame: "Points Per Game",
    assistsPerGame: "Assists Per Game",
    reboundsPerGame: "Rebounds Per Game",
    espnRating: "ESPN Rating",
    topPerformers: "Top Performers",
    playerComparison: "Player Performance Comparison",
    positionBreakdown: "Total Position Breakdown (does not change)",
    teamDistribution: "Team Distribution",
    showPercentage: "Show Percentage",
    player: "Player",
    team: "Team",
    position: "Position",
    points: "PTS",
    assists: "AST",
    rebounds: "REB",
    rating: "Rating",
    rank: "Rank",
    // Positions
    pointGuard: "Point Guard",
    shootingGuard: "Shooting Guard",
    smallForward: "Small Forward",
    powerForward: "Power Forward",
    center: "Center",
    // Teams
    DEN: "Denver",
    MIL: "Milwaukee",
    OKC: "Oklahoma City",
    LAL: "LA Lakers",
    SAS: "San Antonio",
    DAL: "Dallas",
    DET: "Detroit",
    BOS: "Boston",
    NYK: "New York",
    SAC: "Sacramento",
    HOU: "Houston",
    ATL: "Atlanta",
    NOR: "New Orleans",
    MIN: "Minnesota",
    POR: "Portland",
    LAC: "LA Clippers",
    PHI: "Philadelphia",
    PHO: "Phoenix",
    ORL: "Orlando",
    CHA: "Charlotte",
    GSW: "Golden State",
    MIA: "Miami",
    IND: "Indiana",
    MEM: "Memphis",
    CLE: "Cleveland",
    CHI: "Chicago",
    TOR: "Toronto",
  },
  ja: {
    title: "NBA 2024-2025シーズンリーダーダッシュボード",
    subtitle: "トップNBA選手のパフォーマンスと統計を追跡",
    language: "言語",
    overview: "概要",
    scoring: "得点リーダー",
    rating: "ESPNレーティング",
    teams: "チーム分析",
    totalPlayers: "総選手数",
    avgPoints: "平均得点",
    topScorer: "得点王",
    avgRating: "平均ESPNレーティング",
    thisMonth: "今シーズン",
    vs_lastSeason: "対前シーズン",
    selectPosition: "ポジション選択",
    selectTeam: "チーム選択",
    selectStat: "統計選択",
    allPositions: "全ポジション",
    allTeams: "全チーム",
    pointsPerGame: "1試合平均得点",
    assistsPerGame: "1試合平均アシスト",
    reboundsPerGame: "1試合平均リバウンド",
    espnRating: "ESPNレーティング",
    topPerformers: "トップパフォーマー",
    playerComparison: "選手パフォーマンス比較",
    positionBreakdown: "ポジション別内訳",
    teamDistribution: "チーム分布",
    showPercentage: "パーセンテージ表示",
    player: "選手",
    team: "チーム",
    position: "ポジション",
    points: "得点",
    assists: "アシスト",
    rebounds: "リバウンド",
    rating: "レーティング",
    rank: "順位",
    // Positions
    pointGuard: "ポイントガード",
    shootingGuard: "シューティングガード",
    smallForward: "スモールフォワード",
    powerForward: "パワーフォワード",
    center: "センター",
    // Teams
    DEN: "デンバー",
    MIL: "ミルウォーキー",
    OKC: "オクラホマシティ",
    LAL: "LAレイカーズ",
    SAS: "サンアントニオ",
    DAL: "ダラス",
    DET: "デトロイト",
    BOS: "ボストン",
    NYK: "ニューヨーク",
    SAC: "サクラメント",
    HOU: "ヒューストン",
    ATL: "アトランタ",
    NOR: "ニューオーリンズ",
    MIN: "ミネソタ",
    POR: "ポートランド",
    LAC: "LAクリッパーズ",
    PHI: "フィラデルフィア",
    PHO: "フェニックス",
    ORL: "オーランド",
    CHA: "シャーロット",
    GSW: "ゴールデンステート",
    MIA: "マイアミ",
    IND: "インディアナ",
    MEM: "メンフィス",
    CLE: "クリーブランド",
    CHI: "シカゴ",
    TOR: "トロント",
  },
}

// NBA Player Data
const nbaPlayers = [
  { rank: 1, name: "Nikola Jokic", team: "DEN", position: "C", rpg: 12.7, apg: 10.2, pts: 29.6, espn: 62.9 },
  { rank: 2, name: "Giannis Antetokounmpo", team: "MIL", position: "PF", rpg: 11.9, apg: 6.5, pts: 30.4, espn: 55.7 },
  { rank: 3, name: "Shai Gilgeous-Alexander", team: "OKC", position: "PG", rpg: 5.0, apg: 6.4, pts: 32.7, espn: 53.4 },
  { rank: 4, name: "Luka Doncic", team: "LAL", position: "PG", rpg: 8.2, apg: 7.7, pts: 28.2, espn: 49.1 },
  { rank: 5, name: "Victor Wembanyama", team: "SAS", position: "C", rpg: 11.0, apg: 3.7, pts: 24.3, espn: 47.5 },
  { rank: 6, name: "Anthony Davis", team: "DAL", position: "PF", rpg: 11.6, apg: 3.5, pts: 24.7, espn: 46.6 },
  { rank: 7, name: "Cade Cunningham", team: "DET", position: "PG", rpg: 6.1, apg: 9.1, pts: 26.1, espn: 46.4 },
  { rank: 8, name: "LeBron James", team: "LAL", position: "SF", rpg: 7.8, apg: 8.2, pts: 24.4, espn: 46.3 },
  { rank: 9, name: "Jayson Tatum", team: "BOS", position: "SF", rpg: 8.7, apg: 6.0, pts: 26.8, espn: 46.0 },
  { rank: 10, name: "Karl-Anthony Towns", team: "NYK", position: "C", rpg: 12.8, apg: 3.1, pts: 24.4, espn: 45.5 },
  { rank: 11, name: "Domantas Sabonis", team: "SAC", position: "PF", rpg: 13.9, apg: 6.0, pts: 19.1, espn: 44.4 },
  { rank: 12, name: "Kevin Durant", team: "HOU", position: "PF", rpg: 6.0, apg: 4.2, pts: 26.6, espn: 43.4 },
  { rank: 13, name: "Trae Young", team: "ATL", position: "PG", rpg: 3.1, apg: 11.6, pts: 24.2, espn: 42.9 },
  { rank: 14, name: "Zion Williamson", team: "NOR", position: "PF", rpg: 7.2, apg: 5.3, pts: 24.6, espn: 42.5 },
  { rank: 15, name: "Anthony Edwards", team: "MIN", position: "SG", rpg: 5.7, apg: 4.5, pts: 27.6, espn: 42.1 },
  { rank: 16, name: "Damian Lillard", team: "POR", position: "PG", rpg: 4.7, apg: 7.1, pts: 24.9, espn: 42.0 },
  { rank: 17, name: "James Harden", team: "LAC", position: "SG", rpg: 5.8, apg: 8.7, pts: 22.8, espn: 41.5 },
  { rank: 18, name: "Jalen Brunson", team: "NYK", position: "PG", rpg: 2.9, apg: 7.3, pts: 26.0, espn: 41.5 },
  { rank: 19, name: "Devin Booker", team: "PHO", position: "SG", rpg: 4.1, apg: 7.1, pts: 25.6, espn: 41.4 },
  { rank: 20, name: "Tyrese Maxey", team: "PHI", position: "PG", rpg: 3.3, apg: 6.1, pts: 26.3, espn: 40.8 },
  { rank: 21, name: "Paolo Banchero", team: "ORL", position: "PF", rpg: 7.5, apg: 4.8, pts: 25.9, espn: 40.5 },
  { rank: 22, name: "LaMelo Ball", team: "CHA", position: "PG", rpg: 4.9, apg: 7.4, pts: 25.2, espn: 40.3 },
  { rank: 23, name: "Stephen Curry", team: "GSW", position: "PG", rpg: 4.4, apg: 6.0, pts: 24.5, espn: 40.2 },
  { rank: 24, name: "Joel Embiid", team: "PHI", position: "C", rpg: 8.2, apg: 4.5, pts: 23.8, espn: 39.7 },
  { rank: 25, name: "Kyrie Irving", team: "DAL", position: "PG", rpg: 4.8, apg: 4.6, pts: 24.7, espn: 39.5 },
  { rank: 26, name: "Tyler Herro", team: "MIA", position: "SG", rpg: 5.2, apg: 5.5, pts: 23.9, espn: 39.2 },
  { rank: 27, name: "De'Aaron Fox", team: "SAS", position: "PG", rpg: 4.8, apg: 6.3, pts: 23.5, espn: 39.2 },
  { rank: 28, name: "Jalen Johnson", team: "ATL", position: "SF", rpg: 10.0, apg: 5.0, pts: 18.9, espn: 38.9 },
  { rank: 29, name: "Tyrese Haliburton", team: "IND", position: "PG", rpg: 3.5, apg: 9.2, pts: 18.6, espn: 38.8 },
  { rank: 30, name: "Franz Wagner", team: "ORL", position: "SF", rpg: 5.7, apg: 4.7, pts: 24.2, espn: 38.7 },
  { rank: 31, name: "Ja Morant", team: "MEM", position: "PG", rpg: 4.1, apg: 7.3, pts: 23.2, espn: 38.1 },
  { rank: 32, name: "Ivica Zubac", team: "LAC", position: "C", rpg: 12.6, apg: 2.7, pts: 16.8, espn: 37.9 },
  { rank: 33, name: "Alperen Sengun", team: "HOU", position: "C", rpg: 10.3, apg: 4.9, pts: 19.1, espn: 37.8 },
  { rank: 34, name: "Donovan Mitchell", team: "CLE", position: "SG", rpg: 4.5, apg: 5.0, pts: 24.0, espn: 37.6 },
  { rank: 35, name: "Jalen Williams", team: "OKC", position: "SF", rpg: 5.3, apg: 5.1, pts: 21.6, espn: 37.4 },
  { rank: 36, name: "Nikola Vucevic", team: "CHI", position: "C", rpg: 10.1, apg: 3.5, pts: 18.5, espn: 37.3 },
  { rank: 37, name: "Evan Mobley", team: "CLE", position: "PF", rpg: 9.3, apg: 3.2, pts: 18.5, espn: 37.0 },
  { rank: 38, name: "Jamal Murray", team: "DEN", position: "PG", rpg: 3.9, apg: 6.0, pts: 21.4, espn: 36.9 },
  { rank: 39, name: "Scottie Barnes", team: "TOR", position: "SF", rpg: 7.7, apg: 5.8, pts: 19.3, espn: 36.5 },
  { rank: 40, name: "Zach LaVine", team: "SAC", position: "SG", rpg: 4.3, apg: 4.2, pts: 23.3, espn: 36.3 },
  { rank: 41, name: "Brandon Ingram", team: "TOR", position: "SF", rpg: 5.6, apg: 5.2, pts: 22.2, espn: 36.3 },
  { rank: 42, name: "Bam Adebayo", team: "MIA", position: "C", rpg: 9.6, apg: 4.3, pts: 18.1, espn: 36.1 },
  { rank: 43, name: "Jaylen Brown", team: "BOS", position: "SG", rpg: 5.8, apg: 4.5, pts: 22.2, espn: 35.7 },
  { rank: 44, name: "Kawhi Leonard", team: "LAC", position: "SF", rpg: 5.9, apg: 3.1, pts: 21.5, espn: 35.5 },
  { rank: 45, name: "Desmond Bane", team: "ORL", position: "SG", rpg: 6.1, apg: 5.3, pts: 19.2, espn: 35.4 },
  { rank: 46, name: "Pascal Siakam", team: "IND", position: "PF", rpg: 6.9, apg: 3.4, pts: 20.2, espn: 35.3 },
  { rank: 47, name: "Darius Garland", team: "CLE", position: "PG", rpg: 2.9, apg: 6.7, pts: 20.6, espn: 35.1 },
  { rank: 48, name: "RJ Barrett", team: "TOR", position: "SG", rpg: 6.3, apg: 5.4, pts: 21.1, espn: 35.1 },
  { rank: 49, name: "Austin Reaves", team: "LAL", position: "SG", rpg: 4.5, apg: 5.8, pts: 20.2, espn: 35.0 },
  { rank: 50, name: "Jaren Jackson Jr.", team: "MEM", position: "PF", rpg: 5.6, apg: 2.0, pts: 22.2, espn: 34.9 },
]

// Pie Chart Component
const PieChart = ({
  data,
  colors,
  centerX = 150,
  centerY = 150,
  radius = 120,
}: {
  data: { label: string; value: number; percentage: number }[]
  colors: string[]
  centerX?: number
  centerY?: number
  radius?: number
}) => {
  let cumulativePercentage = 0

  const createArcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle)
    const end = polarToCartesian(centerX, centerY, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
    return [
      "M",
      centerX,
      centerY,
      "L",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "Z",
    ].join(" ")
  }

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    }
  }

  return (
    <svg width="300" height="300" viewBox="0 0 300 300">
      {data.map((item, index) => {
        const startAngle = cumulativePercentage * 3.6
        const endAngle = (cumulativePercentage + item.percentage) * 3.6
        cumulativePercentage += item.percentage

        return (
          <path
            key={index}
            d={createArcPath(startAngle, endAngle)}
            fill={colors[index % colors.length]}
            stroke="white"
            strokeWidth="2"
          />
        )
      })}
    </svg>
  )
}

export function NBADashboard() {
  const [language, setLanguage] = useState<"en" | "ja">("en")
  const [selectedPosition, setSelectedPosition] = useState("all")
  const [selectedTeam, setSelectedTeam] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")

  const t = translations[language]

  // Filter players based on selections
  const filteredPlayers = nbaPlayers.filter((player) => {
    const positionMatch = selectedPosition === "all" || player.position === selectedPosition
    const teamMatch = selectedTeam === "all" || player.team === selectedTeam
    return positionMatch && teamMatch
  })

  // Calculate statistics
  const topScorer = nbaPlayers.reduce((prev, current) => (prev.pts > current.pts ? prev : current))
  const avgPoints = nbaPlayers.reduce((sum, player) => sum + player.pts, 0) / nbaPlayers.length
  const avgESPN = nbaPlayers.reduce((sum, player) => sum + player.espn, 0) / nbaPlayers.length

  // Generate position data
  const positionCounts = nbaPlayers.reduce(
    (acc, player) => {
      acc[player.position] = (acc[player.position] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Prepare pie chart data
  const pieChartData = Object.entries(positionCounts).map(([position, count]) => ({
    label: position,
    value: count,
    percentage: (count / nbaPlayers.length) * 100,
  }))

  const pieChartColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

  // Generate team data
  const teamCounts = nbaPlayers.reduce(
    (acc, player) => {
      acc[player.team] = (acc[player.team] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const teamData = Object.entries(teamCounts)
    .map(([team, count]) => ({ team, count, name: t[team as keyof typeof t] || team }))
    .sort((a, b) => b.count - a.count)

  // Format numbers
  const formatNumber = (num: number, decimals = 1) => {
    return language === "ja"
      ? num.toLocaleString("ja-JP", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : num.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
          padding: "1rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #dc2626, #2563eb)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              NBA
            </div>
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#111827", margin: 0 }}>{t.title}</h1>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>{t.subtitle}</p>
            </div>
          </div>

          {/* Language Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1rem" }}>🌐</span>
            <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}>{t.language}:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "ja")}
              style={{
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                backgroundColor: "white",
                fontSize: "0.875rem",
              }}
            >
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </header>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "1.5rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#dbeafe",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                👥
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#059669",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                📈 +5%
              </div>
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "#111827", marginBottom: "0.25rem" }}>
              {nbaPlayers.length}
            </div>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>{t.totalPlayers}</div>
            <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem" }}>{t.thisMonth}</div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "1.5rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#dcfce7",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                📊
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#059669",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                📈 +3.2%
              </div>
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "#111827", marginBottom: "0.25rem" }}>
              {formatNumber(avgPoints)}
            </div>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>{t.avgPoints}</div>
            <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem" }}>{t.vs_lastSeason}</div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "1.5rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#fef2f2",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                ⭐
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  backgroundColor: "#fef2f2",
                  color: "#dc2626",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  fontWeight: "500",
                }}
              >
                #1
              </div>
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "#111827", marginBottom: "0.25rem" }}>
              {topScorer.name}
            </div>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>{t.topScorer}</div>
            <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem" }}>
              {formatNumber(topScorer.pts)} {t.points}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "1.5rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#f3e8ff",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                🏆
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#059669",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                📈 +12%
              </div>
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "#111827", marginBottom: "0.25rem" }}>
              {formatNumber(avgESPN)}
            </div>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>{t.avgRating}</div>
            <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem" }}>{t.espnRating}</div>
          </div>
        </div>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "16px" }}>🔍</span>
            <span style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}>
              {language === "ja" ? "フィルター:" : "Filters:"}
            </span>
          </div>

          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            style={{
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              backgroundColor: "white",
              fontSize: "0.875rem",
              minWidth: "150px",
            }}
          >
            <option value="all">{t.allPositions}</option>
            <option value="PG">{t.pointGuard}</option>
            <option value="SG">{t.shootingGuard}</option>
            <option value="SF">{t.smallForward}</option>
            <option value="PF">{t.powerForward}</option>
            <option value="C">{t.center}</option>
          </select>

          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            style={{
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              backgroundColor: "white",
              fontSize: "0.875rem",
              minWidth: "150px",
            }}
          >
            <option value="all">{t.allTeams}</option>
            {Array.from(new Set(nbaPlayers.map((p) => p.team))).map((team) => (
              <option key={team} value={team}>
                {t[team as keyof typeof t] || team}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div>
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #e5e7eb",
              backgroundColor: "white",
              borderRadius: "8px 8px 0 0",
            }}
          >
            {[
              { id: "overview", label: t.overview },
              { id: "scoring", label: t.scoring },
              { id: "rating", label: t.rating },
              { id: "teams", label: t.teams },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "0.75rem 1.5rem",
                  border: "none",
                  backgroundColor: activeTab === tab.id ? "#f3f4f6" : "transparent",
                  borderBottom: activeTab === tab.id ? "2px solid #3b82f6" : "2px solid transparent",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: activeTab === tab.id ? "#3b82f6" : "#6b7280",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderTop: "none",
              borderRadius: "0 0 8px 8px",
              padding: "1.5rem",
            }}
          >
            {activeTab === "overview" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {/* Top Section with Pie Chart and Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
                  {/* Position Distribution Pie Chart */}
                  <div
                    style={{
                      backgroundColor: "#f9fafb",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "1.5rem",
                        textAlign: "center",
                      }}
                    >
                      {t.positionBreakdown}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
                      <PieChart data={pieChartData} colors={pieChartColors} />
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {pieChartData.map((item, index) => (
                          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <div
                              style={{
                                width: "16px",
                                height: "16px",
                                backgroundColor: pieChartColors[index % pieChartColors.length],
                                borderRadius: "4px",
                              }}
                            />
                            <span style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}>
                              {item.label}
                            </span>
                            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                              ({item.value} - {item.percentage.toFixed(1)}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div
                    style={{
                      backgroundColor: "#f9fafb",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#111827", marginBottom: "1.5rem" }}>
                      {language === "ja" ? "パフォーマンス指標" : "Performance Metrics"}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "1rem",
                          backgroundColor: "white",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                            {language === "ja" ? "最高得点" : "Highest Scorer"}
                          </div>
                          <div style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827" }}>
                            {formatNumber(Math.max(...filteredPlayers.map((p) => p.pts)))} pts
                          </div>
                        </div>
                        <div style={{ fontSize: "1.5rem" }}>🏀</div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "1rem",
                          backgroundColor: "white",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                            {language === "ja" ? "最高アシスト" : "Most Assists"}
                          </div>
                          <div style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827" }}>
                            {formatNumber(Math.max(...filteredPlayers.map((p) => p.apg)))} apg
                          </div>
                        </div>
                        <div style={{ fontSize: "1.5rem" }}>🤝</div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "1rem",
                          backgroundColor: "white",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                            {language === "ja" ? "最高リバウンド" : "Most Rebounds"}
                          </div>
                          <div style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827" }}>
                            {formatNumber(Math.max(...filteredPlayers.map((p) => p.rpg)))} rpg
                          </div>
                        </div>
                        <div style={{ fontSize: "1.5rem" }}>💪</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Performers Grid */}
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#111827", marginBottom: "1.5rem" }}>
                    {t.topPerformers}
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: "1rem",
                    }}
                  >
                    {filteredPlayers.slice(0, 12).map((player, index) => (
                      <div
                        key={player.rank}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "1rem",
                          backgroundColor: index < 3 ? "#fef3c7" : "#f9fafb",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              backgroundColor: index < 3 ? "#f59e0b" : "#6b7280",
                              color: "white",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.875rem",
                              fontWeight: "bold",
                            }}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <div style={{ fontWeight: "600", fontSize: "0.875rem", color: "#111827" }}>
                              {player.name}
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                              {t[player.team as keyof typeof t] || player.team} • {player.position}
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: "700", fontSize: "1rem", color: "#111827" }}>
                            {formatNumber(player.pts)}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{t.points}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "scoring" && (
              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827", marginBottom: "1rem" }}>
                  {t.scoring}
                </h3>
                <div
                  style={{
                    position: "relative",
                    height: "400px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    padding: "1rem",
                  }}
                >
                  <svg width="100%" height="100%" viewBox="0 0 800 300">
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <g key={i}>
                        <line x1="50" y1={50 + i * 40} x2="750" y2={50 + i * 40} stroke="#e5e7eb" strokeWidth="1" />
                        <text x="40" y={55 + i * 40} fontSize="12" fill="#6b7280" textAnchor="end">
                          {35 - i * 5}
                        </text>
                      </g>
                    ))}

                    {/* X-axis labels */}
                    {filteredPlayers.slice(0, 15).map((player, index) => (
                      <text key={index} x={70 + index * 45} y="280" fontSize="10" fill="#6b7280" textAnchor="middle">
                        {index + 1}
                      </text>
                    ))}

                    {/* Points line */}
                    <polyline
                      points={filteredPlayers
                        .slice(0, 15)
                        .map((player, index) => `${70 + index * 45},${250 - (player.pts - 15) * 6}`)
                        .join(" ")}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                    />

                    {/* ESPN Rating line */}
                    <polyline
                      points={filteredPlayers
                        .slice(0, 15)
                        .map((player, index) => `${70 + index * 45},${250 - (player.espn - 30) * 4}`)
                        .join(" ")}
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                    />

                    {/* Data points */}
                    {filteredPlayers.slice(0, 15).map((player, index) => (
                      <g key={index}>
                        <circle cx={70 + index * 45} cy={250 - (player.pts - 15) * 6} r="4" fill="#3b82f6" />
                        <circle cx={70 + index * 45} cy={250 - (player.espn - 30) * 4} r="3" fill="#ef4444" />
                      </g>
                    ))}

                    {/* Legend */}
                    <g>
                      <line x1="600" y1="30" x2="620" y2="30" stroke="#3b82f6" strokeWidth="3" />
                      <text x="625" y="35" fontSize="12" fill="#374151">
                        {t.points}
                      </text>
                      <line x1="600" y1="50" x2="620" y2="50" stroke="#ef4444" strokeWidth="2" />
                      <text x="625" y="55" fontSize="12" fill="#374151">
                        {t.espnRating}
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            )}

            {activeTab === "rating" && (
              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827", marginBottom: "1rem" }}>
                  {language === "ja" ? "ESPNレーティング分析" : "ESPN Rating Analysis"}
                </h3>
                <div
                  style={{
                    position: "relative",
                    height: "400px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    padding: "1rem",
                  }}
                >
                  <svg width="100%" height="100%" viewBox="0 0 800 300">
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                      <g key={i}>
                        <line x1="50" y1={50 + i * 35} x2="750" y2={50 + i * 35} stroke="#e5e7eb" strokeWidth="1" />
                        <text x="40" y={55 + i * 35} fontSize="12" fill="#6b7280" textAnchor="end">
                          {70 - i * 10}
                        </text>
                      </g>
                    ))}

                    {/* X-axis grid */}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <g key={i}>
                        <line x1={50 + i * 87.5} y1="50" x2={50 + i * 87.5} y2="260" stroke="#e5e7eb" strokeWidth="1" />
                        <text x={50 + i * 87.5} y="280" fontSize="12" fill="#6b7280" textAnchor="middle">
                          {10 + i * 5}
                        </text>
                      </g>
                    ))}

                    {/* Scatter points */}
                    {filteredPlayers.map((player, index) => (
                      <circle
                        key={index}
                        cx={50 + (player.pts - 5) * 17.5}
                        cy={260 - (player.espn - 30) * 5.25}
                        r="4"
                        fill="#8b5cf6"
                        opacity="0.7"
                      />
                    ))}

                    {/* Axis labels */}
                    <text x="400" y="295" fontSize="14" fill="#374151" textAnchor="middle">
                      {t.points}
                    </text>
                    <text
                      x="25"
                      y="160"
                      fontSize="14"
                      fill="#374151"
                      textAnchor="middle"
                      transform="rotate(-90, 25, 160)"
                    >
                      {t.espnRating}
                    </text>
                  </svg>
                </div>
              </div>
            )}

            {activeTab === "teams" && (
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "1.5rem" }}
              >
                {/* Team Distribution Chart */}
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827", marginBottom: "1rem" }}>
                    {t.teamDistribution}
                  </h3>
                  <div style={{ height: "300px", backgroundColor: "#f9fafb", borderRadius: "8px", padding: "1rem" }}>
                    <svg width="100%" height="100%" viewBox="0 0 400 250">
                      {teamData.slice(0, 10).map((team, index) => (
                        <g key={team.team}>
                          <rect x="50" y={20 + index * 22} width={team.count * 40} height="18" fill="#10b981" rx="2" />
                          <text x="45" y={32 + index * 22} fontSize="11" fill="#374151" textAnchor="end">
                            {team.name}
                          </text>
                          <text x={55 + team.count * 40} y={32 + index * 22} fontSize="11" fill="#374151">
                            {team.count}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Team Rankings */}
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827", marginBottom: "1rem" }}>
                    {language === "ja" ? "チーム別ランキング" : "Team Rankings"}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {teamData.slice(0, 8).map((team, index) => (
                      <div
                        key={team.team}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.75rem",
                          backgroundColor: "#f9fafb",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div
                            style={{
                              width: "24px",
                              height: "24px",
                              backgroundColor: "#3b82f6",
                              color: "white",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.75rem",
                              fontWeight: "bold",
                            }}
                          >
                            {index + 1}
                          </div>
                          <span style={{ fontWeight: "500", color: "#111827" }}>{team.name}</span>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: "600", color: "#111827" }}>
                            {team.count} {language === "ja" ? "選手" : "players"}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                            {language === "ja" ? "トップ50内" : "in top 50"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Top Players Table */}
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "1.5rem", borderBottom: "1px solid #e5e7eb" }}>
            <h3
              style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827", margin: 0, marginBottom: "0.25rem" }}
            >
              {language === "ja" ? "トップ選手一覧" : "Top Players List"}
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
              {filteredPlayers.length} {language === "ja" ? "選手が表示されています" : "players shown"}
            </p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: "500", color: "#374151" }}>
                    {t.rank}
                  </th>
                  <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: "500", color: "#374151" }}>
                    {t.player}
                  </th>
                  <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: "500", color: "#374151" }}>
                    {t.team}
                  </th>
                  <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: "500", color: "#374151" }}>
                    {t.position}
                  </th>
                  <th style={{ textAlign: "right", padding: "0.75rem", fontWeight: "500", color: "#374151" }}>
                    {t.points}
                  </th>
                  <th style={{ textAlign: "right", padding: "0.75rem", fontWeight: "500", color: "#374151" }}>
                    {t.assists}
                  </th>
                  <th style={{ textAlign: "right", padding: "0.75rem", fontWeight: "500", color: "#374151" }}>
                    {t.rebounds}
                  </th>
                  <th style={{ textAlign: "right", padding: "0.75rem", fontWeight: "500", color: "#374151" }}>
                    {t.rating}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.slice(0, 50).map((player, index) => (
                  <tr
                    key={player.rank}
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      backgroundColor: index % 2 === 0 ? "white" : "#fafafa",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>
                      <div
                        style={{
                          width: "32px",
                          height: "24px",
                          border: "1px solid #d1d5db",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                        }}
                      >
                        {player.rank}
                      </div>
                    </td>
                    <td style={{ padding: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            backgroundColor: "#f3f4f6",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            fontWeight: "500",
                            color: "#6b7280",
                          }}
                        >
                          {player.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span style={{ fontWeight: "500", color: "#111827" }}>{player.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "0.75rem" }}>
                      <div
                        style={{
                          backgroundColor: "#f3f4f6",
                          color: "#374151",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          display: "inline-block",
                        }}
                      >
                        {t[player.team as keyof typeof t] || player.team}
                      </div>
                    </td>
                    <td style={{ padding: "0.75rem", color: "#6b7280" }}>{player.position}</td>
                    <td style={{ padding: "0.75rem", textAlign: "right", fontWeight: "500", color: "#111827" }}>
                      {formatNumber(player.pts)}
                    </td>
                    <td style={{ padding: "0.75rem", textAlign: "right", color: "#111827" }}>
                      {formatNumber(player.apg)}
                    </td>
                    <td style={{ padding: "0.75rem", textAlign: "right", color: "#111827" }}>
                      {formatNumber(player.rpg)}
                    </td>
                    <td style={{ padding: "0.75rem", textAlign: "right", fontWeight: "600", color: "#3b82f6" }}>
                      {formatNumber(player.espn)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            padding: "2rem 0",
            fontSize: "0.875rem",
            color: "#9ca3af",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <span>
              {language === "ja"
                ? "データはESPN NBA統計から取得（2024-2025シーズン）"
                : "Data sourced from ESPN NBA Statistics (2024-2025 Season)"}
            </span>
          </div>
          <p style={{ margin: 0 }}>
            {language === "ja"
              ? "© 2024 NBA シーズンリーダーダッシュボード. 全著作権所有."
              : "© 2024 NBA Season Leaders Dashboard. All rights reserved."}
          </p>
        </footer>
      </div>
    </div>
  )
}
