import {app} from './index'
import { Connection } from './config/DB';

const startServer = async()=>{
    await Connection();

    app.listen(5000);
}
startServer();
