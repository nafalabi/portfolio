import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "@emotion/styled";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Typography from "@/components/Typography";

const RootMain = styled("main")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "100vh",
  width: "100%",
  backgroundColor: theme.colors.background,
  color: theme.colors.text,
  padding: "2rem 0",

  "& .container": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const ArcadeHeader = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  width: "100%",
  maxWidth: "400px",
  marginBottom: "1rem",
  padding: "0.75rem 1.25rem",
  backgroundColor: "rgba(1, 1, 2, 0.05)",
  borderRadius: "12px",
  border: "1px solid rgba(1, 1, 2, 0.15)",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  boxSizing: "border-box" as const,

  "& .score-left": {
    justifySelf: "start",
    alignItems: "flex-start",
  },
  "& .score-right": {
    justifySelf: "end",
    alignItems: "flex-end",
  },
});

const HeaderActionGroup = styled("div")({
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
});

const ScoreBadge = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .label": {
    fontSize: "0.7rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#55555e",
    marginBottom: "2px",
  },
  "& .value": {
    fontSize: "1.35rem",
    fontWeight: 700,
    color: theme.colors.text,
    fontFamily: "monospace",
  },
  "& .high-value": {
    color: theme.colors.text,
  },
}));

const IconActionButton = styled("button")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "38px",
  height: "38px",
  borderRadius: "10px",
  backgroundColor: "rgba(1, 1, 2, 0.08)",
  border: "1px solid rgba(1, 1, 2, 0.2)",
  color: theme.colors.text,
  cursor: "pointer",
  transition: "all 0.2s ease",
  outline: "none",

  "&:hover": {
    backgroundColor: "rgba(1, 1, 2, 0.15)",
    borderColor: "rgba(1, 1, 2, 0.35)",
    transform: "scale(1.05)",
  },

  "&:active": {
    transform: "scale(0.95)",
  },
}));

const CanvasWrapper = styled("div")({
  position: "relative",
  width: "100%",
  maxWidth: "400px",
  aspectRatio: "1/1",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.05)",
  border: "1px solid rgba(1, 1, 2, 0.2)",
});

const CanvasElement = styled("canvas")({
  width: "100%",
  height: "100%",
  backgroundColor: "#18181b",
  display: "block",
});

const OverlayContainer = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(9, 9, 11, 0.85)",
  backdropFilter: "blur(4px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  padding: "1.5rem",
  textAlign: "center",
  zIndex: 10,
});

const ControlsPanel = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  marginTop: "1.5rem",
  width: "100%",
  maxWidth: "400px",
});

const DPadRow = styled("div")({
  display: "flex",
  gap: "0.5rem",
  justifyContent: "center",
});

const DPadButton = styled("button")(({ theme }) => ({
  width: "54px",
  height: "54px",
  borderRadius: "14px",
  backgroundColor: "rgba(1, 1, 2, 0.08)",
  border: "1px solid rgba(1, 1, 2, 0.2)",
  color: theme.colors.text,
  fontSize: "1.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
  transition: "all 0.15s ease",
  outline: "none",

  "&:hover": {
    backgroundColor: "rgba(1, 1, 2, 0.15)",
    borderColor: "rgba(1, 1, 2, 0.35)",
  },

  "&:active": {
    backgroundColor: "rgba(1, 1, 2, 0.25)",
    transform: "scale(0.92)",
  },
}));

const ModalOverlay = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.65)",
  backdropFilter: "blur(6px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 200,
});

const ModalBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.colors.background,
  color: theme.colors.text,
  width: "90%",
  maxWidth: "340px",
  borderRadius: "16px",
  padding: "1.5rem",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)",
  border: "1px solid rgba(1, 1, 2, 0.15)",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
}));

const DifficultyCard = styled("button")<{ active: boolean }>(({ active, theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "0.85rem 1rem",
  borderRadius: "10px",
  border: active ? `2px solid ${theme.colors.button.blue}` : "1px solid rgba(1, 1, 2, 0.15)",
  backgroundColor: active ? "rgba(21, 12, 108, 0.08)" : "rgba(1, 1, 2, 0.03)",
  color: theme.colors.text,
  cursor: "pointer",
  transition: "all 0.2s ease",
  outline: "none",
  textAlign: "left",

  "& .title-text": {
    fontWeight: active ? 700 : 600,
    fontSize: "0.95rem",
  },

  "& .desc-text": {
    fontSize: "0.75rem",
    color: "#55555e",
    marginTop: "2px",
  },

  "&:hover": {
    backgroundColor: active ? "rgba(21, 12, 108, 0.12)" : "rgba(1, 1, 2, 0.07)",
  },
}));

const GRID_SIZE = 16;
const GRID_COUNT = 25; // 25 * 16 = 400

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

type DifficultyLevel = "easy" | "normal" | "hard";

const SPEED_FRAMES: Record<DifficultyLevel, number> = {
  easy: 6,   // ~10 FPS (Slower speed)
  normal: 4, // ~15 FPS (Medium speed)
  hard: 2,   // ~30 FPS (Faster speed)
};

const SnakePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [gameState, setGameState] = useState<"idle" | "playing" | "paused" | "gameover">("idle");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("normal");
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("snake_high_score");
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  // Mutable game state stored in refs to avoid closure stale state in animation loop
  const snakeRef = useRef<{
    x: number;
    y: number;
    dx: number;
    dy: number;
    cells: { x: number; y: number }[];
    maxCells: number;
  }>({
    x: 160,
    y: 160,
    dx: GRID_SIZE,
    dy: 0,
    cells: [],
    maxCells: 4,
  });

  const appleRef = useRef<{ x: number; y: number }>({
    x: 320,
    y: 320,
  });

  const frameCountRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const gameStateRef = useRef(gameState);
  const difficultyRef = useRef<DifficultyLevel>(difficulty);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    difficultyRef.current = difficulty;
  }, [difficulty]);

  const resetGameEngine = useCallback(() => {
    snakeRef.current = {
      x: 160,
      y: 160,
      dx: GRID_SIZE,
      dy: 0,
      cells: [],
      maxCells: 4,
    };
    appleRef.current = {
      x: getRandomInt(0, GRID_COUNT) * GRID_SIZE,
      y: getRandomInt(0, GRID_COUNT) * GRID_SIZE,
    };
    setScore(0);
  }, []);

  const changeDirection = useCallback((newDx: number, newDy: number) => {
    const current = snakeRef.current;
    // Prevent reversing directly onto itself
    if (newDx !== 0 && current.dx === -newDx) return;
    if (newDy !== 0 && current.dy === -newDy) return;

    current.dx = newDx;
    current.dy = newDy;
  }, []);

  const startGame = useCallback(() => {
    resetGameEngine();
    setGameState("playing");
  }, [resetGameEngine]);

  const pauseGame = useCallback(() => {
    setGameState((prev) => (prev === "playing" ? "paused" : prev === "paused" ? "playing" : prev));
  }, []);

  const openSettings = useCallback(() => {
    setGameState((prev) => (prev === "playing" ? "paused" : prev));
    setIsSettingsOpen(true);
  }, []);

  // Main Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const gameLoop = () => {
      animFrameIdRef.current = requestAnimationFrame(gameLoop);

      if (gameStateRef.current !== "playing") return;

      // Throttle loop according to current difficulty speed threshold
      const speedThreshold = SPEED_FRAMES[difficultyRef.current] || 4;
      if (++frameCountRef.current < speedThreshold) {
        return;
      }
      frameCountRef.current = 0;

      const snake = snakeRef.current;
      const apple = appleRef.current;

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Move snake by current velocity
      snake.x += snake.dx;
      snake.y += snake.dy;

      // Wrap-around edge detection
      if (snake.x < 0) {
        snake.x = canvas.width - GRID_SIZE;
      } else if (snake.x >= canvas.width) {
        snake.x = 0;
      }

      if (snake.y < 0) {
        snake.y = canvas.height - GRID_SIZE;
      } else if (snake.y >= canvas.height) {
        snake.y = 0;
      }

      // Keep track of head position
      snake.cells.unshift({ x: snake.x, y: snake.y });

      // Pop tail cell
      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
      }

      // Draw Apple (Theme Red #991b1b)
      context.fillStyle = "#991b1b";
      context.shadowColor = "#991b1b";
      context.shadowBlur = 6;
      context.fillRect(apple.x, apple.y, GRID_SIZE - 1, GRID_SIZE - 1);
      context.shadowBlur = 0; // reset shadow

      // Draw Snake Body (Silver / Off-White #f4f4f5 Head / #a1a1aa Body)
      snake.cells.forEach((cell, index) => {
        context.fillStyle = index === 0 ? "#f4f4f5" : "#a1a1aa";
        context.fillRect(cell.x, cell.y, GRID_SIZE - 1, GRID_SIZE - 1);

        // Snake eats Apple
        if (cell.x === apple.x && cell.y === apple.y) {
          snake.maxCells++;
          setScore((prevScore) => {
            const nextScore = prevScore + 10;
            setHighScore((prevHigh) => {
              if (nextScore > prevHigh) {
                if (typeof window !== "undefined") {
                  localStorage.setItem("snake_high_score", nextScore.toString());
                }
                return nextScore;
              }
              return prevHigh;
            });
            return nextScore;
          });

          apple.x = getRandomInt(0, GRID_COUNT) * GRID_SIZE;
          apple.y = getRandomInt(0, GRID_COUNT) * GRID_SIZE;
        }

        // Self-collision detection
        for (let i = index + 1; i < snake.cells.length; i++) {
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            setGameState("gameover");
          }
        }
      });
    };

    animFrameIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === " ") {
        pauseGame();
        return;
      }

      if (gameStateRef.current !== "playing") return;

      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          changeDirection(-GRID_SIZE, 0);
          break;
        case "ArrowUp":
        case "w":
        case "W":
          changeDirection(0, -GRID_SIZE);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          changeDirection(GRID_SIZE, 0);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          changeDirection(0, GRID_SIZE);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection, pauseGame]);

  return (
    <RootMain>
      <Container className="container">
        <Typography variant="title" css={{ marginBottom: "0.25rem", fontWeight: 600, textAlign: "center" }}>
          Let's see how good you are
        </Typography>
        <Typography variant="body2" css={{ color: "#55555e", fontSize: "0.8rem", marginBottom: "1.25rem", textAlign: "center" }}>
          Use Arrow Keys or WASD to navigate
        </Typography>

        <ArcadeHeader>
          <ScoreBadge className="score-left">
            <span className="label">Score</span>
            <span className="value">{score}</span>
          </ScoreBadge>

          <HeaderActionGroup>
            <IconActionButton
              onClick={pauseGame}
              title={gameState === "paused" ? "Resume Game" : "Pause Game"}
              aria-label="Pause/Resume"
            >
              {gameState === "paused" ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <polygon points="6 4 20 12 6 20" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              )}
            </IconActionButton>

            <IconActionButton onClick={startGame} title="Restart Game" aria-label="Restart Game">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </IconActionButton>

            <IconActionButton onClick={openSettings} title="Settings" aria-label="Settings">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </IconActionButton>
          </HeaderActionGroup>

          <ScoreBadge className="score-right">
            <span className="label">High Score</span>
            <span className="value high-value">{highScore}</span>
          </ScoreBadge>
        </ArcadeHeader>

        <CanvasWrapper>
          <CanvasElement ref={canvasRef} width={400} height={400} />

          {gameState === "idle" && (
            <OverlayContainer>
              <Typography variant="title" css={{ fontSize: "1.5rem" }}>
                Ready to Play?
              </Typography>
              <Button color="blue" onClick={startGame}>
                Start Game
              </Button>
            </OverlayContainer>
          )}

          {gameState === "paused" && (
            <OverlayContainer>
              <Typography variant="title" css={{ fontSize: "1.5rem" }}>
                Game Paused
              </Typography>
              <Button color="blue" onClick={pauseGame}>
                Resume
              </Button>
            </OverlayContainer>
          )}

          {gameState === "gameover" && (
            <OverlayContainer>
              <Typography variant="title" css={{ fontSize: "1.75rem", color: "#ef4444" }}>
                Game Over!
              </Typography>
              <Typography variant="body" css={{ color: "#e4e4e7" }}>
                Final Score: <strong>{score}</strong>
              </Typography>
              <Button color="blue" onClick={startGame}>
                Play Again
              </Button>
            </OverlayContainer>
          )}
        </CanvasWrapper>

        <ControlsPanel>
          <DPadRow>
            <DPadButton onClick={() => changeDirection(0, -GRID_SIZE)} aria-label="Up">
              ▲
            </DPadButton>
          </DPadRow>
          <DPadRow>
            <DPadButton onClick={() => changeDirection(-GRID_SIZE, 0)} aria-label="Left">
              ◀
            </DPadButton>
            <DPadButton onClick={() => changeDirection(0, GRID_SIZE)} aria-label="Down">
              ▼
            </DPadButton>
            <DPadButton onClick={() => changeDirection(GRID_SIZE, 0)} aria-label="Right">
              ▶
            </DPadButton>
          </DPadRow>
        </ControlsPanel>
      </Container>

      {isSettingsOpen && (
        <ModalOverlay onClick={() => setIsSettingsOpen(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="title" css={{ fontSize: "1.25rem", fontWeight: 700 }}>
                Settings ⚙️
              </Typography>
              <IconActionButton onClick={() => setIsSettingsOpen(false)} aria-label="Close">
                ✕
              </IconActionButton>
            </div>

            <Typography variant="body2" css={{ color: "#55555e", fontSize: "0.8rem", marginTop: "-0.5rem" }}>
              Select game difficulty speed
            </Typography>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <DifficultyCard active={difficulty === "easy"} onClick={() => setDifficulty("easy")}>
                <div>
                  <div className="title-text">Easy 🟢</div>
                  <div className="desc-text">Lower speed (relaxed control)</div>
                </div>
                {difficulty === "easy" && <span>✓</span>}
              </DifficultyCard>

              <DifficultyCard active={difficulty === "normal"} onClick={() => setDifficulty("normal")}>
                <div>
                  <div className="title-text">Normal 🔵</div>
                  <div className="desc-text">Medium speed (standard)</div>
                </div>
                {difficulty === "normal" && <span>✓</span>}
              </DifficultyCard>

              <DifficultyCard active={difficulty === "hard"} onClick={() => setDifficulty("hard")}>
                <div>
                  <div className="title-text">Hard 🔴</div>
                  <div className="desc-text">Faster speed (high challenge)</div>
                </div>
                {difficulty === "hard" && <span>✓</span>}
              </DifficultyCard>
            </div>

            <Button color="blue" onClick={() => setIsSettingsOpen(false)} css={{ width: "100%", marginTop: "0.5rem" }}>
              Done
            </Button>
          </ModalBox>
        </ModalOverlay>
      )}
    </RootMain>
  );
};

export default SnakePage;
