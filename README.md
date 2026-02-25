# Java Guide Basics (Web)

Multi-page Java Basics guide for students.

## Tech Stack

- Java 21
- Maven
- Spark Java (lightweight web server)
- Plain HTML/CSS/JS

## Features

- Menu page that routes to each guide section
- Guide pages: Startup (Skeleton + Scanner), Variables/Types,
  Conditionals, Loops, Arrays, 2D Arrays

## Run

1. Ensure JDK 21+ is installed (`java` and `javac` available in PATH).
2. (Recommended) Ensure `JAVA_HOME` points to your JDK 21.
3. From the project root:

```bash
./mvnw compile exec:java
```

4. Open:

```text
http://localhost:4567
```

5. Optional health check:

```text
http://localhost:4567/health
```

## VS Code One-Click Run/Debug

- Run task: `Run Java Guide Web App` (Terminal > Run Task)
- Debug profile: `Debug Java Guide App` (Run and Debug view)
- Config files: `.vscode/tasks.json` and `.vscode/launch.json`

Optional (if you have global Maven installed):

```bash
mvn compile exec:java
```

## Publish Online from GitHub

This app uses a Java backend, so **GitHub Pages alone is not enough**.

Use Render (recommended):

1. Push this project to GitHub.
2. In Render, create a new **Web Service** from your GitHub repo.
3. Render auto-detects `render.yaml` in the repo root.
4. Deploy and open your live URL.

Included deployment files:

- `render.yaml` (Render config)
- `Procfile` (compatible with many process-based hosts)

Build/start commands used by deployment:

```bash
./mvnw -q clean package
java -jar target/java-guide-basics.jar
```

## JDK Troubleshooting

If you see "No compiler is provided in this environment":

- You are likely on a JRE, not JDK.
- Install JDK 21 and set `JAVA_HOME`.
- Confirm:

```bash
java -version
javac -version
```

## Notes

- This app serves static guide pages from a lightweight Java backend.