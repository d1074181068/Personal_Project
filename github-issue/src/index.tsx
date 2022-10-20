//Librariess
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
//components
import App from './App'
import Home from './pages/Home/Home'
import Issue from './pages/Issue/Issue'
import IssueList from './pages/IssueList/IssueList'
import Label from './pages/Label/LabelList'
import NewIssue from './pages/NewIssue/NewIssue'

//custom
import { store } from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='issueList' element={<IssueList />} />
          <Route path='label' element={<Label />} />
          <Route path='newIssue' element={<NewIssue />} />
          <Route path='issue/:issueId' element={<Issue />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
