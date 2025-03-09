import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";

function App() {
    return (
        <div>
            <h2>header</h2>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            return (
                                <Route key={index} path={route.path} element={<Page />}></Route>
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
