import React, { useEffect, useRef } from "react";

export const Audio = ({ audioUrl }: any) => {
  const musicRef = useRef(null) as any;

  useEffect(() => {
    const playAudio = async () => {
      try {
        await musicRef.current.play();
      } catch (error) {
        // La lecture automatique a été bloquée
        console.log("La lecture automatique du son est bloquée par le navigateur.");
      }
    };

    const requestAudioPermission = async () => {
      try {
        await musicRef.current.play();
        await musicRef.current.pause();
      } catch (error) {
        // La demande de lecture a été bloquée ou l'utilisateur a refusé
        console.log("L'utilisateur a refusé la lecture automatique du son.");
      }
    };

    const element = musicRef.current;

    // Demander la permission à l'utilisateur lorsqu'il arrive sur la page
    document.addEventListener("DOMContentLoaded", requestAudioPermission);

    // Lancer automatiquement la lecture audio une fois la permission accordée
    element.addEventListener("canplaythrough", playAudio);

    return () => {
      document.removeEventListener("DOMContentLoaded", requestAudioPermission);
      element.removeEventListener("canplaythrough", playAudio);
    };
  }, []);

  return <audio controls ref={musicRef} src={audioUrl} />;
};