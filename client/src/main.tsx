import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { PrivateRoute } from "./routes/privateRoute";
import { ThemeProvider } from "styled-components";
import dark from "./theme/dark"
import { Auth } from "./routes/auth";
import { Home } from "./routes/home";
import { User } from "./routes/user";
import { Post } from "./routes/post"
import { Publish } from "./routes/publish";
import "./main.css"
import { Followers } from "./routes/followers";
import { Following } from "./routes/following";
import { Settings } from "./routes/settings";

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={dark}>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/publish" element={<PrivateRoute><Publish /></PrivateRoute>}/>
        <Route path="/post/:postId" element={<PrivateRoute><Post /></PrivateRoute>}/>
        <Route path="/:target" element={<PrivateRoute><User /></PrivateRoute>} />
        <Route path="/:target/followers" element={<PrivateRoute><Followers /></PrivateRoute>} />
        <Route path="/:target/following" element={<PrivateRoute><Following /></PrivateRoute>}/>
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>}/>
        <Route path="*" element={<PrivateRoute><Home /></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)
