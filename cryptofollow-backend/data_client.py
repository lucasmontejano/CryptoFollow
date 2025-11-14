# data_client.py
import requests

# URL: Top 100 por capitalização de mercado, em USD
COINGECKO_TOP_100_URL = (
    'https://api.coingecko.com/api/v3/coins/markets'
    '?vs_currency=usd'
    '&order=market_cap_desc'
    '&per_page=100'
    '&page=1'
    '&sparkline=false'
)

def get_top_100_coins():
    """
    Busca as Top 100 moedas da API CoinGecko.
    Retorna uma LISTA de dicionários em caso de sucesso ou None em caso de falha.
    """
    try:
        response = requests.get(COINGECKO_TOP_100_URL)
        response.raise_for_status()
        return response.json()  
    
    except requests.exceptions.RequestException as e:
        print(f"ERRO [data_client]: Falha ao buscar dados: {e}")
        return None
    

def get_coin_history(coin_id, days="30"):
    """
    Busca o histórico de mercado de uma moeda (ex: 'bitcoin')
    dos últimos X dias.
    """
    url = f"https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart"
    params = {
        'vs_currency': 'usd',
        'days': days,
        'interval': 'daily'
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        # A API retorna um JSON com chaves: 'prices', 'market_caps', 'total_volumes'
        # Estamos interessados apenas em 'prices'
        return response.json().get('prices')
    
    except requests.exceptions.RequestException as e:
        print(f"ERRO [data_client]: Falha ao buscar histórico para {coin_id}: {e}")
        return None