from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./database.db"
    API_PREFIX: str = "/api"
    DEBUG: bool = False
    ALLOWED_ORIGINS_STR: str = ""
    OPENAI_API_KEY: str

    @property
    def ALLOWED_ORIGINS(self) -> List[str]:
        # Allow all Vercel preview/production domains and localhost
        default_origins = ["http://localhost:3000", "http://localhost:5173"]
        custom_origins = self.ALLOWED_ORIGINS_STR.split(",") if self.ALLOWED_ORIGINS_STR else []
        return list(set(default_origins + custom_origins))

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        
settings = Settings()