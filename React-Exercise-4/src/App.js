import Grid from "./Grid";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/font-awesome/css/font-awesome.min.css"
import { EuiProvider } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';

const App = () => {
  return (
    <EuiProvider colorMode="light">
      <div className="App container">
        <Grid />
      </div>
    </EuiProvider>
  );
}

export default App;