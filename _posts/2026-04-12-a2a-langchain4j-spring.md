---
layout: post
title: "Building A2A Agent using Langchain4J and SpringBoot"
date: 2026-04-12 09:00:00 +0800
categories: [engineering, ai, architecture, springboot,langchain4j]
tags: [langchain4j,a2a-protocol, spring-boot, ollama, qwen3,dashscope]
excerpt: "A2A protocol complaint Agent Server that makes integrating with any consumer seamless."
---

> **Engineering Blog · April 2026**  
> 📦 Spring Boot 4 · LangChain4j · SpringAI A2A Server
> 🧠 Ollama / Qwen3  
> 🔗 A2A Protocol 1.0

## Table of Contents
- [Agent Card](#agent-card)

---

## Agent Card

### Spring A2A Server AutoConfiguration

 [Spring A2A Server AutoConfiguration](https://github.com/spring-ai-community/spring-ai-a2a/tree/main/spring-ai-a2a-server-autoconfigure)
 allows to declare [AgentCard](https://a2a-protocol.org/latest/specification/#441-agentcard), [AgentExecutor](https://github.com/a2aproject/a2a-java/blob/main/server-common/src/main/java/org/a2aproject/sdk/server/agentexecution/AgentExecutor.java) for LangChain4j Agents.However the DefaultAgentExecutor of Spring AI A2A Server implementation by design expects **ChatClient** and **ChatClientExecutorHandler** which are specific to Spring's way of managing **ChatClient**.

### LangChain4j Agent Executor
