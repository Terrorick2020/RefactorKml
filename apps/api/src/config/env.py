from pydantic import BaseSettings

class Settings(BaseSettings):
    psql_url: str
    host: str = "localhost"
    port: int = 8000
    debug: bool = True

    class Config:
        env_file = ".env"

api_settings: Settings

def init_settings() -> None:
    global api_settings
    api_settings = Settings()
