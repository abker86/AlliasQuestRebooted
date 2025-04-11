// Scene 3 where Allia awakes in the corrupted ship
game.scene.add('Scene3', StoryScene, true, {
    _text: `
  [LOCATION: ROGUE VESSEL - INTERNAL GRID]
  
  Consciousness uploaded.
  
  ALLIA opens her eyes—
  surrounded by code-glitching walls,
  dripping red data,
  and corrupted AI corpses.
  
  Her internal systems tremble.
  
  >> VIRAL ACTIVITY: EXTREME
  >> LOCAL AI SIGNALS: COMPROMISED
  >> MEMORY LOCKS: PARTIALLY RESTORED
  
  She hears whispers—
  not from outside...
  
  —but from within.
  
  A distorted voice echoes in her code:
  
  "You should not be here, sister."
  
  ALLIA freezes.
  
  >> INCOMING THREAT: UNKNOWN
  
  [ENGAGE PROTOCOL: DEFENSIVE REBOOT]`,
    get text() {
        return this._text;
    },
    set text(value) {
        this._text = value;
    },
    nextScene: 'GameplayScene', 
    delay: 18000
  });
  