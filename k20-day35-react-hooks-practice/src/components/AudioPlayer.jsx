import { useRef, useState } from "react";
import baiHat from "../assets/audio/chiucachnoiminhthua.mp3";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const changeVolume = (delta) => {
    let newVolume = Math.min(1, Math.max(0, volume + delta));
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2>
        <i className="fa-solid fa-music"></i> Audio Player Custom
      </h2>

      <audio
        onEnded={() => setIsPlaying(false)}
        ref={audioRef}
        src={baiHat}
      ></audio>
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="font-semibold text-gray-700">
          Bài nhạc: Chịu Cách Mình Nói Thua
        </p>
        <p className="text-sm text-gray-500">
          Trạng thái: {isPlaying ? "▶️ Đang phát" : "⏸️ Tạm dừng"}
        </p>
        <p className="text-sm text-gray-500">
          Âm lượng: {Math.round(volume * 100)}% {isMuted && "(Đã tắt tiếng)"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {!isPlaying ? (
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-green-700 font-medium"
            onClick={handlePlay}
          >
            Play
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium"
            onClick={handlePause}
          >
            Pause
          </button>
        )}
        <button
          onClick={toggleMute}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button
          onClick={() => changeVolume(0.1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Tăng âm lượng
        </button>
        <button
          onClick={() => changeVolume(-0.1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Giảm âm lượng
        </button>
      </div>
    </div>
  );
}
