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
import { GetSerra01ControllerVendas } from './controllers/22serra1/GetSerra01ControllerVendas';
import { GetSerra02ControllerVendas } from './controllers/23serra2/GetSerra02ControllerVendas';
import { GetLaranjeirasControllerVendas } from './controllers/24laranjeiras/GetLaranjeirasControllerVendas';
import { GetTerraVermelha03ControllerVendas } from './controllers/25terravermelha3/GetTerraVermelha03ControllerVendas';
import { GetSerraControllerVendas } from './controllers/26serra/GetSerraControllerVendas';
import { GetQuatroPistasControllerVendas } from './controllers/27quatropistas/GetQuatroPistasControllerVendas';
import { GetLoja28ControllerVendas } from './controllers/28/GetLoja28ControllerVendas';
import { GetMercadaoControllerVendas } from './controllers/29mercadao/GetMercadaoControllerVendas';
import { GetLaranjeiras03ControllerVendas } from './controllers/30laranjeiras3/GetLaranjeiras03ControllerVendas';
import { GetCariacicaControllerVendas } from './controllers/31cariacica/GetCariacicaControllerVendas';
import { GetAlegriaCardControllerVendas } from './controllers/32alegriacard/GetAlegriaCardControllerVendas';
import { GetCariacica02ControllerVendas } from './controllers/33cariacica2/GetCariacica02ControllerVendas';

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
router.get('/vendasBarraMares', new GetBarraMaresControllerVendas().ex)
router.get('/vendasMatriz', new GetMatrizControllerVendas().ex)
router.get('/vendasSoteco', new GetSotecoControllerVendas().ex)
router.get('vendasSantaMonica', new GetSantaMonicaControllerVendas().ex)
router.get('/vendasCentroVilaVelha', new GetCentroVilaVelhaControllerVendas().ex)
router.get('/vendasItapua1', new GetItapuaControllerVendas().ex)
router.get('/vendasAmorSaude', new GetAmoresSaudeControllerVendas().ex)
router.get('/vendasCastanheiras', new GetCastanheirasControllerVendas().ex)
router.get('/vendasItapua02', new GetItapua02ControllerVendas().ex)
router.get('/vendasSerra01', new GetSerra01ControllerVendas().ex)
router.get('/vendasSerra02', new GetSerra02ControllerVendas().ex)
router.get('/vendasLaranjeiras', new GetLaranjeirasControllerVendas().ex)
router.get('/vendasTerraVermelha03', new GetTerraVermelha03ControllerVendas().ex)
router.get('/vendasSerra', new GetSerraControllerVendas().ex)
router.get('/vendasQuatroPistas', new GetQuatroPistasControllerVendas().ex)
router.get('/vendasLoja28', new GetLoja28ControllerVendas().ex)
router.get('/vendasMercadao', new GetMercadaoControllerVendas().ex)
router.get('/vendasLaranjeiras03', new GetLaranjeiras03ControllerVendas().ex)
router.get('/vendasCariacica', new GetCariacicaControllerVendas().ex)
router.get('/vendasAlegriaCard', new GetAlegriaCardControllerVendas().ex)
router.get('/vendasCariacica02', new GetCariacica02ControllerVendas().ex)

export { router }