import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import RequisicaoIncorreta from "../erros/requisicaoIncorreta.js";
import ErroValidacao from "../erros/erroValidacao.js";

//middlewares: funcoes especias passadas como parametro para o app.use() que interceptam uma requisicao que e feita para nossa API

//este middleware de manipulador de erros intercepta os erros da aplicacao sempre que um erro for lancado na nela 

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError){
    // console.log(erro.errors);
    new ErroValidacao(erro).enviarResposta(res);
  } else if(erro instanceof ErroBase) {
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;