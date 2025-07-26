# Current Taks: Phase 1 - Basic Data Pipeline

## Goal
Get raw player data from the SWGOH API and cache it in Redis.

## Technology Focus
- Python FastAPI
- Redis
- httpx

## Modules to Build in This Phase:
[X] Environment Config Manager (#37) - Load .env variables and settings
[X] Constants Manager (#38) - SWGOH API endpoints, cache keys, timeouts
[X] Logger Service (#36) - Structured logging with rotation
[ ] Discord Notification Service (#91) - Service to alert Discord for different actions.
[ ] SWGOH API Client (#7) - httpx client with proper headers and auth
[ ] API Rate Limiter (#8) - Rate limiting to respect SWGOH API limits
[ ] API Error Handler (#10) - Handle 429, 404, 500 errors from game API
[ ] Redis Connection Manager (#31) - Redis connection with connection pooling
[ ] Cache Key Generator (#33) - Consistent player:{ally_code} key format
[ ] Data Serializer (#34) - JSON serialization for Redis storage
[ ] TTL Manager (#35) - Set 3600s (1 hour) expiration on all player data
[ ] Cache Service (#32) - get/set operations with automatic TTL
[ ] Raw Data Cleaner (#12) - Remove unnecessary fields to reduce size
[ ] Data Validator (#16) - Ensure required fields exist and are valid
[ ] Data Fetcher (#11) - Orchestrate: check cache → API call → store
[ ] API Response Parser (#9) - Parse SWGOH API JSON response structure

## Instructions
Focus only on the modules listed above.
Do not implement any evaluation logic or database logic yet.
The primary deliverable is a service that can fetch and cache player data.