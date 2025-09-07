from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class StoryOptionLLM(BaseModel):
    text: str = Field(description="the text of the option shown to the user")
    nextNode: Dict[str, Any] = Field(description="the next node in the story")

class StoryNodeLLM(BaseModel):
    content: str = Field(description="the content of the story node")
    isEnding: bool = Field(default=False, description="whether this node is an ending")
    isWinningEnding: bool = Field(default=False, description="whether this node is a winning ending")
    options: List[StoryOptionLLM] = Field(default_factory=list, description="list of options for the user to choose from")

class StoryLLMResponse(BaseModel):
    title: str = Field(description="the title of the story")
    rootNode: StoryNodeLLM = Field(description="the root node of the story")
