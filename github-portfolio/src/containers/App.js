import React from 'react';
import Header from "../components/Header/header";
import Profile from "./profile";
import styled, {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
`

const AppWrapper = styled.div`text-align: center`

function App() {
    return (
        <>
            <GlobalStyle />
                <AppWrapper>
                    <Header/>
                    <Profile/>
                </AppWrapper>
        </>
    );
}

export default App;
