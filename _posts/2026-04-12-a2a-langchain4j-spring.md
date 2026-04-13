---
layout: post
title: "Building A2A Agent using Langchain4J and SpringBoot"
date: 2026-04-12 09:00:00 +0800
categories: [engineering, ai, architecture, springboot,langchain4j]
tags: [langchain4j,a2a-protocol, spring-boot, ollama, qwen3,dashscope]
excerpt: "A2A protocol complaint Agent Server that makes integrating with any consumer seamless."
---

> **Engineering Blog · April 2026**  
> 📦 Spring Boot 4 · LangChain4j · SpringAI A2A Server\
> 🧠 Ollama / Qwen3\
> 🔗 **[A2A Protocol 1.0](https://a2a-protocol.org/latest/)** 

## Table of Contents
- [Spring A2A Server AutoConfiguration](#spring-a2a-server-autoconfiguration)
- [LangChain4j Agent](#langchain4j-agent)
- [LangChain4j Agent Executor and Handler](#langchain4j-agent-executor-and-handler)

---

## Overview

```mermaid 
graph LR
    classDef clientContainer fill:#1a1a1a,stroke:#4CAF50,stroke-width:2px,color:#fff;
    classDef serverContainer fill:#1a1a1a,stroke:#4CAF50,stroke-width:2px,color:#fff;
    classDef component fill:#fff,stroke:#333,stroke-width:1px,color:#000;
    classDef greenBox fill:#e8f5e9,stroke:#4CAF50,stroke-width:1px,color:#000;
    classDef blueBox fill:#e3f2fd,stroke:#2196F3,stroke-width:1px,color:#000;
    classDef internalBox fill:#e3f2fd,stroke:#333,stroke-width:1px,color:#000;

    subgraph Client ["A2A Client"]
        direction TB
        ClientSDK[A2A Client SDK]:::blueBox
        ChatClient(ChatClient):::greenBox
        Tools[tools]:::greenBox
        
        ChatClient <--> Tools
        ChatClient <--> ClientSDK
    end

    subgraph Server ["LangChain4j AI Agent (A2A Server)"]
        direction TB
        AgentCardController[AgentCardController]:::component
        
        subgraph MC_Group ["MessageController"]
            direction TB
            MC_Node[MessageController]:::component
            
            subgraph ServerSDK ["A2A Server SDK"]
                direction TB
                Langchain4jAgentExecutor[Langchain4jAgentExecutor]:::greenBox
                Langchain4jAgent[Langchain4jAgent]:::greenBox
                
                Langchain4jAgentExecutor --> Langchain4jAgent
            end
        end
    end

    %% Step 1
    ClientSDK -- "1. .well-known/card" --> AgentCardController
    
    %% Step 2
    AgentCardController -- "AgentCard" --> ClientSDK
    
    %% Step 3 (External)
    ClientSDK -- "2. sendMessage" --> MC_Node
    
    %% Step 3 (Internal Execution)
    MC_Node -- "3. execute" --> Langchain4jAgentExecutor
    
    %% Step 4
    Langchain4jAgentExecutor -- "4. handle" --> Langchain4jAgent
    
    %% Step 5
    Langchain4jAgent -- "5. response" --> ClientSDK

    class Client,Server clientContainer;
    class MC_Group serverContainer;
    class ServerSDK internalBox;

```

## Spring A2A Server AutoConfiguration

 [Spring A2A Server AutoConfiguration](https://github.com/spring-ai-community/spring-ai-a2a/tree/main/spring-ai-a2a-server-autoconfigure)
 allows to declare [AgentCard](https://a2a-protocol.org/latest/specification/#441-agentcard), [AgentExecutor](https://github.com/a2aproject/a2a-java/blob/main/server-common/src/main/java/org/a2aproject/sdk/server/agentexecution/AgentExecutor.java) for [LangChain4j](https://docs.langchain4j.dev/) Agents.However the **DefaultAgentExecutor** of Spring AI A2A Server implementation by design expects **ChatClient** and **ChatClientExecutorHandler** which are specific to Spring's way of managing the **[A2A Server](https://a2a-protocol.org/latest/)** implementation.


## LangChain4j Agent 

Lets build a simple **LangChain4j** Agent using [AgenticServices](https://docs.langchain4j.dev/tutorials/agents/) which allows to build agents using **Builder** pattern. **GeneralQAAgent** is a simple agent capable of managing **Q&A** queries from the customer backed by a language model.

```code
GeneralQAAgent generalQAAgent = AgenticServices
                .agentBuilder(GeneralQAAgent.class)
                .outputKey("answer")
                .chatModel(chatModel)
                .build();
```

To make this **GeneralQAAgent** to participate in **[A2A](https://a2a-protocol.org/latest/)** protocol, we can define custom **Langchain4jAgentExecutor** and **Langchain4jAgentExecutorHandler** 

## LangChain4j Agent Executor and Handler

Lets define two **Functional Interface** for handling the execution request from the **[AgentExecutor](https://github.com/a2aproject/a2a-java/blob/main/server-common/src/main/java/org/a2aproject/sdk/server/agentexecution/AgentExecutor.java)**

✨ One which accepts **ChatModel** and **RequestContext**\
✨ One which accepts **Agent** and **RequestContext**

**Langchain4jChatModelExecutorHandler**
```java
@FunctionalInterface
public interface Langchain4jChatModelExecutorHandler {
    String execute(ChatModel chatModel,RequestContext requestContext);
}
```
**Langchain4jAgentExecutorHandler**
```java
@FunctionalInterface
public interface Langchain4jAgentExecutorHandler {
    String execute(Agent langchain4jAgent, RequestContext requestContext);
}
```

Lets define two custom **[AgentExecutor](https://github.com/a2aproject/a2a-java/blob/main/server-common/src/main/java/org/a2aproject/sdk/server/agentexecution/AgentExecutor.java)** for handling the **[A2A](https://a2a-protocol.org/latest/)** client request 

✨ **Langchain4jAgentExecutor**\
✨ **Langchain4jChatModelExecutor**

Now these **Executors** can be used to integrate with **GeneralQAAgent** to make it particiapate in **[A2A](https://a2a-protocol.org/latest/)** protocol negotiation. 




## Final Outcome

Using **Spring AI A2A Server** , we are successfully able to expose any Agent/AI Service applications built using **Langchain4j** as A2A Server 