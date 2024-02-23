import { Router, Request, Response } from 'express'
import { GetMuquicabaControllerVendas } from './controllers/01muquicaba/GetMuquicabaControllerVendas'
import { GetGuarapariControllerVendas } from './controllers/02guarapari/GetGuarapariControllerVendas';
import { GetExpressControllerVendas } from './controllers/03express/GetExpressControllerVendas';
import { GetMarcilioControllerVendas } from './controllers/05marcilio/GetMarcilioControllerVendas';
import { GetShoppingControllerVendas } from './controllers/06shopping/GetShoppingControllerVendas';
import { GetTerraVermelhaControllerVendas } from './controllers/07terravermelha/GetTerraVermelhaControllerVendas';
import { GetUlissesControllerVendas } from './controllers/11ulisses/GetUlissesControllerVendas';
import { GetMarcilio02ControllerVendas } from './controllers/08marcilio2/GetMarcilio02ControllerVendas';
import { GetAeroportoControllerVendas } from './controllers/09aeroporto/GetAeroportoControllerVendas';
import { GetTerraVermelha02ControllerVendas } from './controllers/10terravermelha2/GetTerraVermelha02ControllerVendas';
import { GetMarcilio03ControllerVendas } from './controllers/12marcilio3/GetMarcilio03ControllerVendas';
import { GetBarraMaresControllerVendas } from './controllers/13barramares/GetBarraMaresControllerVendas';
import { GetMatrizControllerVendas } from './controllers/14matriz/GetMatrizControllerVendas';
import { GetSotecoControllerVendas } from './controllers/15soteco/GetSotecoControllerVendas';
import { GetSantaMonicaControllerVendas } from './controllers/16santamonica/GetSantaMonicaControllerVendas';
import { GetCentroVilaVelhaControllerVendas } from './controllers/17centrovilavelha/GetCentroVilaVelhaControllerVendas';
import { GetItapuaControllerVendas } from './controllers/18itapua1/GetItapuaControllerVendas';
import { GetAmoresSaudeControllerVendas } from './controllers/19amoresaude/GetAmorSaudeControllerVendas';
import { GetCastanheirasControllerVendas } from './controllers/20castanheiras/GetCastanheirasControllerVendas';
import { GetItapua02ControllerVendas } from './controllers/21itapua2/GetItapua02ControllerVendas';

const router = Router();

router.get('/vendasMuquicaba', new GetMuquicabaControllerVendas().ex)
router.get('/vendasGuarapari', new GetGuarapariControllerVendas().ex)
router.get('/vendasExpress', new GetExpressControllerVendas().ex)
router.get('/vendasMarcilio', new GetMarcilioControllerVendas().ex)
router.get('/vendasShopping', new GetShoppingControllerVendas().ex)
router.get('/vendasTerraVermelha', new GetTerraVermelhaControllerVendas().ex)
router.get('/vendasMarcilio02', new GetMarcilio02ControllerVendas().ex)
router.get('/vendasAeroporto', new GetAeroportoControllerVendas().ex)
router.get('/vendasTerraVermelha02', new GetTerraVermelha02ControllerVendas().ex)
router.get('/vendasUlisses', new GetUlissesControllerVendas().ex)
router.get('/vendasMarcilio03', new GetMarcilio03ControllerVendas().ex)

export { router }