import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Editor from "@monaco-editor/react"
import * as Y from "yjs"
import { WebrtcProvider } from "y-webrtc"
import { MonacoBinding } from 'y-monaco'

// 1. Setup Monaco Editor
// 2. Attach YJS Text to Monaco Editor

function App() {
  const editorRef = useRef(null);

  // Everyone is connected via WebRTC -> "test-room"
	// Everyone has access to Y.Doc() -> "monaco": "Hello world!"
	// MonacoBinding changes value of Y.Doc()

  // Initialize YJS, tell it to listen to our monaco instance for changes

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    //1. Initialize YJS
    const doc = new Y.Doc(); // a collection of shared objects -> Text

    //2. Connect ot peers (or start connection) with WebRTC
    const provider = new WebrtcProvider("test-room", doc);
    const type = doc.getText("monaco"); // "monaco" can be named anything. doc { "monaco": "what our IDE is showing" }

    //3. Bind YJS to Monaco (tell YJS to listen for changes from our Monaco instance)
    const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
			// `provider.awareness` lets monaco to be aware (or connect to) webrtcprovider

		console.log(provider.awareness);
  }

  return (
    <Editor
      height="100vh"
      width="100vw"
      theme="vs-dark"
      onMount={handleEditorDidMount} //after loading
    />
  )
}

export default App
