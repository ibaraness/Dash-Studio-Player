import { useRef, useEffect } from "react";
import { shaka } from "../shaka/shaka";

export default function useShakaVideoPlayer() {

    const isInitiated = useRef(false);
    const isSupportedBrowser = useRef<boolean>(true);

    // Shaka player reference - to be used between renders
    const shakaPlayerRef = useRef(new shaka.Player());

    // Video element ref
    const videoElementRef = useRef<HTMLVideoElement>(document.createElement('video'));

    useEffect(() => {
        if (!isInitiated.current) {
            isInitiated.current = true;
            // Install built-in polyfills to patch browser incompatibilities.
            shaka.polyfill.installAll();

            // Check to see if the browser supports the basic APIs Shaka needs.
            if (shaka.Player.isBrowserSupported()) {
                // Everything looks good!
                // Create Dash player using video element
                shakaPlayerRef.current.attach(videoElementRef.current);
            } else {
                // Set supported flag to false so fallback player can be activated (regular streaming);
                isSupportedBrowser.current = false;
            }
        }
    });

    return {
        player: shakaPlayerRef.current,
        videoElement: videoElementRef.current,
        isSupportedBrowser: isSupportedBrowser.current
    }
}