# main.py
import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data_client import get_top_100_coins
from data_client import get_top_100_coins, get_coin_history

# --- 1. Nosso "Cache" e "Relógio" ---
# Em vez de dcc.Store, usamos uma variável Python simples
app_cache = {
    "data": None,
    "last_fetched": None
}
# Define a "validade" do cache (5 minutos)
CACHE_DURATION = datetime.timedelta(minutes=5)
# ------------------------------------

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/top100")
def get_crypto_data():
    
    # --- 2. Lógica de Cache (A Tradução do Dash) ---
    now = datetime.datetime.now()
    
    # Verifica se o cache está vazio OU se o tempo de validade passou
    if app_cache["last_fetched"] is None or (now - app_cache["last_fetched"]) > CACHE_DURATION:
        
        print(">>> CACHE EXPIRADO. Buscando dados novos na API...")
        
        # Chama a API da CoinGecko
        new_data = get_top_100_coins()
        
        # Se a busca na API foi bem-sucedida
        if new_data:
            # Atualiza nosso cache
            app_cache["data"] = new_data
            app_cache["last_fetched"] = now
            # Retorna os dados novos
            return new_data
        else:
            # Se a API falhou, mas temos dados antigos no cache,
            # é melhor retornar os dados antigos do que dar erro.
            if app_cache["data"]:
                print(">>> AVISO: API falhou, servindo dados antigos (stale data).")
                return app_cache["data"]
            else:
                # Se a API falhou e não temos NADA no cache
                return {"error": "Falha ao buscar dados da API"}

    # Se o cache ainda estiver "fresco" (menos de 5 min)
    else:
        print(">>> CACHE FRESCO. Servindo dados do cache.")
        # Retorna os dados do cache sem chamar a API
        return app_cache["data"]
    
history_cache = {}
CACHE_DURATION_HISTORY = datetime.timedelta(hours=1)
# --------------------------------------------------------

@app.get("/api/coin/{coin_id}/history")
def get_crypto_history(coin_id: str):
    """
    Endpoint para buscar o histórico de uma moeda.
    Usa um cache por ID de moeda.
    """
    now = datetime.datetime.now()

    # Verifica se temos um cache FRESCO para esta moeda específica
    if (
        coin_id in history_cache and
        (now - history_cache[coin_id]["last_fetched"]) <= CACHE_DURATION_HISTORY
    ):
        print(f">>> CACHE FRESCO (Histórico): Servindo {coin_id} do cache.")
        return history_cache[coin_id]["data"]

    # Se o cache expirou ou não existe
    print(f">>> CACHE EXPIRADO (Histórico): Buscando {coin_id} na API...")
    history_data = get_coin_history(coin_id) # Usamos "30" dias por padrão

    if history_data:
        # Salva no cache
        history_cache[coin_id] = {
            "data": history_data,
            "last_fetched": now
        }
        return history_data
    else:
        return {"error": f"Falha ao buscar dados para {coin_id}"}