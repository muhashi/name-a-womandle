import React, { useState, useEffect, useMemo } from 'react';
import { Button, Container, Title, Text, TextInput, Card, Group, Stack, Badge, Anchor, Box, Progress, Center } from '@mantine/core';
import { Clock, Home, Trophy, Search, ExternalLink } from 'lucide-react';
import WOMEN_DATASET from './data/notable_women_lookup.json';
import CHALLENGE_THEMES from './data/themes';

// Add CSS for shake animation
const shakeKeyframes = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;

// Inject the CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shakeKeyframes;
  document.head.appendChild(style);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function WomendleGame() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'game'
  const [gameMode, setGameMode] = useState(null); // 'daily', 'random'
  const [currentTheme, setCurrentTheme] = useState(null);
  const [validWomen, setValidWomen] = useState([]);
  const [guessedWomen, setGuessedWomen] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [wrongGuess, setWrongGuess] = useState(false);

  // Generate daily theme based on date
  const getDailyTheme = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const themes = Object.keys(CHALLENGE_THEMES);
    return themes[dayOfYear % themes.length];
  };

  // Get random theme
  const getRandomTheme = () => {
    const themes = Object.keys(CHALLENGE_THEMES);
    return themes[Math.floor(Math.random() * themes.length)];
  };

  // Initialize game
  const startGame = (mode) => {
    const theme = mode === 'daily' ? getDailyTheme() : getRandomTheme();
    const themeData = CHALLENGE_THEMES[theme];
    
    // Filter women based on theme
    const filtered = Object.entries(WOMEN_DATASET).filter(([key, value]) => themeData.filter(value)).map(([key, value]) => key);
    console.log(filtered);

    setGameMode(mode);
    setCurrentTheme({ name: theme, ...themeData });
    setValidWomen(filtered);
    setGuessedWomen([]);
    setSearchInput('');
    setTimer(0);
    setGameStarted(true);
    setGameCompleted(false);
    setCurrentScreen('game');
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted]);

  // Handle guess submission
  const handleGuess = () => {
    if (!searchInput.trim()) return;
    
    const guess = searchInput.trim().toLowerCase().normalize("NFKD").replace(/\p{Diacritic}/gu, "");
    const foundWoman = WOMEN_DATASET[guess] && validWomen.includes(guess);
    const foundWomanData = WOMEN_DATASET[guess];

    if (foundWoman && foundWomanData && !guessedWomen.find(w => w?.n === foundWoman?.n)) {
      const newGuessed = [foundWomanData, ...guessedWomen];
      setGuessedWomen(newGuessed);
      setSearchInput('');
      setWrongGuess(false);
      
      if (newGuessed.length >= 10) {
        setGameCompleted(true);
        setGameStarted(false);
      }
    } else {
      // Visual feedback for wrong guess could be added here
      setWrongGuess(true);
      setSearchInput('');
      setTimeout(() => setWrongGuess(false), 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  const goHome = () => {
    setCurrentScreen('home');
    setGameStarted(false);
    setGameCompleted(false);
    setTimer(0);
  };

  // Home screen
  if (currentScreen === 'home') {
    return (
      <Container size="md" style={{ 
        minHeight: '100vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        margin: 0,
        maxWidth: '100%',
        width: '100vw'
      }}>
        <Box style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          textAlign: 'center',
          maxWidth: '600px',
          width: '90%'
        }}>
          <Stack align="center" gap="xl">
            <Title 
              order={1} 
              size="4.5rem" 
              style={{ 
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}
            >
              Womendle
            </Title>
            
            <Text size="xl" ta="center" c="dark" style={{ lineHeight: 1.6, fontWeight: 500 }}>
              Test your knowledge of remarkable women throughout history! 
              Each challenge asks you to name 10 women fitting a specific theme.
            </Text>

            <Stack gap="md" mt="xl" style={{ width: '100%' }}>
              <Button
                size="xl"
                leftSection={<Trophy size={24} />}
                variant="gradient"
                gradient={{ from: 'pink', to: 'grape' }}
                onClick={() => startGame('daily')}
                style={{ 
                  height: '60px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
                }}
                fullWidth
              >
                Daily Challenge
              </Button>
              
              <Button
                size="xl"
                leftSection={<Search size={24} />}
                variant="outline"
                color="dark"
                onClick={() => startGame('random')}
                style={{ 
                  height: '60px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderWidth: '2px'
                }}
                fullWidth
              >
                Random Challenge
              </Button>
            </Stack>

            <Text size="md" c="dimmed" mt="lg" style={{ fontStyle: 'italic' }}>
              Daily challenges change every day. Random challenges give you a new theme each time!
            </Text>
          </Stack>
        </Box>
      </Container>
    );
  }

  // Game screen
  return (
    <Box style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      // padding: '1rem',
      width: '100vw',
      margin: 0
    }}>
      <Box style={{ maxWidth: 'none', padding: '2rem 2rem' }}>
        {/* Header */}
        <Group justify="space-between" mb="xl" style={{
          background: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <Title 
            order={2} 
            style={{ 
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer'
            }}
            onClick={goHome}
          >
            Womendle
          </Title>
          
          <Button
            variant="subtle"
            leftSection={<Home size={16} />}
            onClick={goHome}
          >
            Home
          </Button>
        </Group>

        {/* Game Info */}
        <Card withBorder mb="lg" p="xl" style={{
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <Stack gap="lg">
            <Group justify="space-between" align="flex-start">
              <Box style={{ flex: 1 }}>
                <Title order={3} mb="xs">{currentTheme?.name}</Title>
                <Text c="dimmed" size="lg">{currentTheme?.description}</Text>
              </Box>
              <Badge 
                size="xl" 
                variant={gameMode === 'daily' ? 'filled' : 'outline'}
                color={gameMode === 'daily' ? 'pink' : 'blue'}
                style={{ padding: '8px 16px' }}
              >
                {gameMode === 'daily' ? 'Daily' : 'Random'} Challenge
              </Badge>
            </Group>
            
            <Group justify="space-between" align="center">
              <Group gap="xl">
                <Group gap="xs" style={{
                  background: 'rgba(255, 107, 107, 0.1)',
                  padding: '8px 16px',
                  borderRadius: '25px'
                }}>
                  <Trophy size={18} color="#ff6b6b" />
                  <Text fw={600} size="lg">{guessedWomen.length}/10</Text>
                </Group>
                
                <Group gap="xs" style={{
                  background: 'rgba(78, 205, 196, 0.1)',
                  padding: '8px 16px',
                  borderRadius: '25px'
                }}>
                  <Clock size={18} color="#4ecdc4" />
                  <Text fw={600} size="lg">{formatTime(timer)}</Text>
                </Group>
              </Group>
              
              <Box style={{ width: '250px' }}>
                <Text size="sm" c="dimmed" mb="xs" ta="right">Progress</Text>
                <Progress 
                  value={(guessedWomen.length / 10) * 100} 
                  size="xl" 
                  radius="xl"
                  color="pink"
                  style={{ 
                    boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)'
                  }}
                />
              </Box>
            </Group>
          </Stack>
        </Card>

        {/* Search Input */}
        {!gameCompleted && (
          <>
            {wrongGuess && (
              <Card withBorder mb="md" p="md" style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
                color: 'white',
                textAlign: 'center',
                animation: 'shake 0.5s ease-in-out'
              }}>
                <Text fw={600}>Not quite right! Try another name that fits the theme.</Text>
              </Card>
            )}
            <Card withBorder mb="lg" p="xl" style={{
              background: 'white',
              borderRadius: '15px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: wrongGuess ? '2px solid #ff6b6b' : '1px solid #e9ecef',
              transition: 'all 0.3s ease'
            }}>
              <Center>
                <Group align="end" style={{ width: '100%', maxWidth: '600px' }}>
                  <TextInput
                    placeholder="Type a woman's name..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    size="xl"
                    style={{ flex: 1 }}
                    leftSection={<Search size={20} />}
                    styles={{
                      input: {
                        borderRadius: '10px',
                        border: wrongGuess ? '2px solid #ff6b6b' : '2px solid #e9ecef',
                        fontSize: '1.1rem',
                        padding: '12px 16px 12px 48px',
                        transition: 'all 0.3s ease',
                      }
                    }}
                    error={wrongGuess}
                  />
                  <Button 
                    size="xl"
                    onClick={handleGuess}
                    disabled={!searchInput.trim()}
                    style={{
                      height: '50px',
                      borderRadius: '10px',
                      fontWeight: 600
                    }}
                    variant="gradient"
                    gradient={{ from: 'pink', to: 'grape' }}
                  >
                    Guess
                  </Button>
                </Group>
              </Center>
            </Card>
          </>
        )}

      {/* Game Completion */}
      {gameCompleted && (
        <Card withBorder mb="lg" p="lg" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Center>
            <Stack align="center" gap="md">
              <Trophy size={48} />
              <Title order={2}>Congratulations!</Title>
              <Text size="lg">You completed the challenge in {formatTime(timer)}!</Text>
              <Group>
                <Button variant="white" color="dark" onClick={goHome}>
                  New Game
                </Button>
                <Button variant="outline" style={{ color: 'white', borderColor: 'white' }} onClick={() => startGame('random')}>
                  Random Challenge
                </Button>
              </Group>
            </Stack>
          </Center>
        </Card>
      )}

      {/* Guessed Women List */}
      {guessedWomen.length > 0 && (
        <Card withBorder p="lg">
          <Title order={4} mb="md">Your Guesses ({guessedWomen.length}/10)</Title>
          <Stack gap="md">
            {guessedWomen.map((woman, index) => (
              <Card key={index} withBorder p="md" style={{ background: '#f8f9fa' }}>
                <Group justify="space-between" align="flex-start">
                  <div style={{ flex: 1 }}>
                    <Group align="center" mb="xs">
                      <Text fw={500} size="lg">{woman.n}</Text>
                      <Badge variant="light" color="blue">
                        {woman.c}
                      </Badge>
                    </Group>
                    
                    <Group gap="xs" mb="xs">
                      <Text size="sm" c="dimmed">
                        Born: {new Date(woman.d).toLocaleDateString()}
                      </Text>
                    </Group>
                    
                    <Group gap="xs">
                      {woman?.j?.map((job, jobIndex) => (
                        <Badge key={jobIndex} size="sm" variant="outline">
                          {job}
                        </Badge>
                      )) || <Text size="sm" c="dimmed">No occupations listed</Text>}
                    </Group>
                  </div>
                  
                  <Anchor
                    href={`https://en.wikipedia.org/wiki/${woman.w}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Group gap="xs">
                      <Text size="sm">Wikipedia</Text>
                      <ExternalLink size={14} />
                    </Group>
                  </Anchor>
                </Group>
              </Card>
            ))}
          </Stack>
        </Card>
      )}

        {/* Hints or encouragement */}
        {guessedWomen.length === 0 && gameStarted && (
          <Card withBorder p="lg" style={{ background: '#e3f2fd' }}>
            <Text ta="center" c="dimmed">
              Start typing to make your first guess! Think of famous women who fit the theme.
            </Text>
          </Card>
        )}
      </Box>
    </Box>
  );
}

export default WomendleGame;