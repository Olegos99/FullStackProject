import './App.css';
import FirstDataUploadingComponent from './InitialDataControll/FirstDataUploadingComponent'
import MainRouter from './MyComponents/MainRouter';
import TopNavBar from './MyComponents/TopNavBar';

function App() {
  return (
    <div className="App">
      {/* <FirstDataUploadingComponent></FirstDataUploadingComponent> */}
      <TopNavBar></TopNavBar>
      <MainRouter></MainRouter>
    </div>
  );
}

export default App;
