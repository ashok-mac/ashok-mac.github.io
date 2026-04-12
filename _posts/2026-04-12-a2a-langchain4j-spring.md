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
- [Spring A2A Server AutoConfiguration](#spring-a2a-server-autoconfiguration)
- [LangChain4j Agent](#langchain4j-agent)

---

## Spring A2A Server AutoConfiguration

 [Spring A2A Server AutoConfiguration](https://github.com/spring-ai-community/spring-ai-a2a/tree/main/spring-ai-a2a-server-autoconfigure)
 allows to declare [AgentCard](https://a2a-protocol.org/latest/specification/#441-agentcard), [AgentExecutor](https://github.com/a2aproject/a2a-java/blob/main/server-common/src/main/java/org/a2aproject/sdk/server/agentexecution/AgentExecutor.java) for [LangChain4j](https://docs.langchain4j.dev/) Agents.However the **DefaultAgentExecutor** of Spring AI A2A Server implementation by design expects **ChatClient** and **ChatClientExecutorHandler** which are specific to Spring's way of managing the A2A Server implementation.


## LangChain4j Agent 

Lets build an A2A Complaint LangChain4j Agents 

[LangChain4jAgents](https://docs.langchain4j.dev/tutorials/agents/) allows to build agents using **Builder** pattern. **GeneralQAAgent** is a simple agent capable of managing **Q&A** queries from the customer backed by language model.

```code
GeneralQAAgent generalQAAgent = AgenticServices
                .agentBuilder(GeneralQAAgent.class)
                .outputKey("answer")
                .chatModel(chatModel)
                .build();
```

To make this **GeneralQAAgent** to participate in **A2A** protocol, we can define custom **Langchain4jAgentExecutor** and **Langchain4jAgentExecutorHandler** 

## LangChain4j Agent Executor & Handler
