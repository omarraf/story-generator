from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str
    API_PREFIX: str = "/api"
    DEBUG: bool = False
    ALLOWED_ORIGINS_STR: str
    OPENAI_API_KEY: str

    @property
    def ALLOWED_ORIGINS(self) -> List[str]:
        return self.ALLOWED_ORIGINS_STR.split(",") if self.ALLOWED_ORIGINS_STR else []

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        
settings = Settings()