export const GAME_MANUAL_STEP = process.env.STEP !== undefined

export const GAME_HEIGHT = 5
export const GAME_WIDTH = 5
export const GAME_PLAYER_WIDTH = 1
export const GAME_SKIP_WIDTH = 3
export const LEVEL_UP_FREQUENCY = 10
export const GAME_SPEED_CURVE = 2.5

export const GAME_FRAME_INTERVAL = GAME_MANUAL_STEP ? 1 : 15
export const INITIAL_GAME_SPEED = GAME_MANUAL_STEP ? 1 : 30
