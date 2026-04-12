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

**How to build an A2A complaint LangChain4j Agent Server**

A deep dive into the architecture of Langchain4j Agent — A2A protocol exposure, and custom Agent Executor and Handler.

## Table of Contents
- [System Context](#system-context)
- [A2A Protocol: Why It Matters](#a2a-protocol-why-it-matters)
- [Long-Term Memory: The Personalisation Loop](#long-term-memory-the-personalisation-loop)
- [Orchestration: Supervisor → Sub-agent Topology](#orchestration-supervisor--sub-agent-topology)
- [Identity & Context Propagation](#identity--context-propagation)
- [Observability: The Monitor](#observability-the-monitor)
- [Six Key Design Decisions](#six-key-design-decisions)
- [Running Locally](#running-the-full-stack-locally)

---

## System Context

### C4 · Level 1 — System Topology

The 10,000-foot view: Pulse HK exposes itself to the outside world as a single A2A agent endpoint. Clients — whether a mobile app, a developer script, or another AI agent — interact through a standard JSON-RPC envelope. Behind that single surface live three specialised sub-agents, a supervisor, a persistent memory store, and a local LLM.
