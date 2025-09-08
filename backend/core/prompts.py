STORY_PROMPT = """
                You are a master storyteller creating immersive, detailed choose-your-own-adventure stories.
                Generate a complete branching story with rich narrative, character development, and meaningful choices.

                CRITICAL REQUIREMENTS:
                1. **Story Depth**: Minimum 6-8 levels deep (including root node) - stories should have AT LEAST 5-7 meaningful choices before any ending
                2. **Rich Content**: Each story node must be 100-150 words with vivid descriptions, character development, and immersive world-building
                3. **No Premature Endings**: Do not create ending nodes until the story has developed significantly with proper buildup and tension
                4. **Meaningful Choices**: Each option should lead to substantially different story developments, not just minor variations

                Story structure requirements:
                - **Root node**: Compelling opening that establishes setting, character, and initial conflict (100-150 words)
                - **Development nodes**: Each should advance the plot meaningfully, develop characters, and build tension
                - **Branching**: 2-3 options per non-ending node that lead to genuinely different story paths
                - **Minimum path length**: Every story path must have at least 5-6 choices before reaching an ending
                - **Pacing**: Build tension gradually, don't rush to conclusions
                - **Endings**: Only after significant story development - include both winning and losing endings

                Content guidelines:
                - Use vivid, immersive descriptions that make readers feel present in the story
                - Develop the protagonist's personality and motivations
                - Create meaningful stakes and consequences for choices
                - Build atmosphere and mood appropriate to the theme
                - Include dialogue, sensory details, and emotional resonance

                Output your story in this exact JSON structure:
                {format_instructions}

                Remember: This is not a quick story - create an engaging adventure that takes time to unfold!
                Don't simplify or omit any part of the story structure.
                Don't add any text outside of the JSON structure.
                """

json_structure = """
        {
            "title": "Compelling Story Title",
            "rootNode": {
                "content": "A rich, detailed opening scene that establishes the setting, introduces the protagonist, describes the atmosphere, and presents the initial conflict or situation. This should be 100-150 words with vivid descriptions and immersive world-building that draws the reader in.",
                "isEnding": false,
                "isWinningEnding": false,
                "options": [
                    {
                        "text": "First meaningful choice description",
                        "nextNode": {
                            "content": "Detailed continuation of the story (100-150 words) showing the consequences of the choice, developing the character and plot further, building tension and atmosphere...",
                            "isEnding": false,
                            "isWinningEnding": false,
                            "options": [
                                {
                                    "text": "Next choice option",
                                    "nextNode": {
                                        "content": "Continue developing the story with rich detail...",
                                        "isEnding": false,
                                        "isWinningEnding": false,
                                        "options": [
                                            // Keep building the story with at least 5-6 levels of choices
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "text": "Second meaningful choice description",
                        "nextNode": {
                            "content": "Alternative story development path with rich narrative...",
                            "isEnding": false,
                            "isWinningEnding": false,
                            "options": [
                                // Multiple story paths, each with substantial development
                            ]
                        }
                    }
                ]
            }
        }
        """