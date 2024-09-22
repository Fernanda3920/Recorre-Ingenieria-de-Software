import React, { useState, useEffect } from 'react';

const SpeechSynthesis = ({ optimizedRoute }) => {
  const [speechInstance, setSpeechInstance] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true); // Mostrar botón de inicio solo al principio

  useEffect(() => {
    if ('speechSynthesis' in window && optimizedRoute?.instructions?.length > 0) {
      // Formatear correctamente las instrucciones
      const instructions = optimizedRoute.instructions
        .map(inst => {
          const text = inst.text || 'Instrucción no disponible';
          const distance = isNaN(inst.distance) ? 'distancia desconocida' : `${inst.distance} metros`;
          const duration = isNaN(inst.time) ? 'duración desconocida' : `${(inst.time / 1000).toFixed(0)} segundos`;

          return `${text}, en ${distance}, duración: ${duration}`;
        })
        .join('. ');

      const newSpeechInstance = new SpeechSynthesisUtterance(instructions);
      newSpeechInstance.lang = 'es-ES';
      setSpeechInstance(newSpeechInstance);
    } else {
      console.error('Speech Synthesis not supported or no instructions to speak');
    }
  }, [optimizedRoute]);

  const startSpeaking = () => {
    if (speechInstance) {
      window.speechSynthesis.cancel(); // Cancelar cualquier síntesis en curso
      window.speechSynthesis.speak(speechInstance);
      setShowStartButton(false); // Ocultar el botón de inicio después de iniciarse la síntesis
    }
  };

  const pauseInstructions = () => {
    if (speechInstance && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeInstructions = () => {
    if (speechInstance && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  return (
    <div className="speech-controls">
      {showStartButton && (
        <button className="btn btn-outline-light" onClick={startSpeaking}>
          <i className="fas fa-volume-up"></i> Iniciar Instrucciones
        </button>
      )}
      {!showStartButton && (
        <>
          {!isPaused ? (
            <button className="btn btn-outline-light" onClick={pauseInstructions}>
              <i className="fas fa-pause"></i> Pausar
            </button>
          ) : (
            <button className="btn btn-outline-light" onClick={resumeInstructions}>
              <i className="fas fa-play-circle"></i> Reanudar
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SpeechSynthesis;
