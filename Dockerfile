# Use a imagem oficial do Maven com OpenJDK 17
FROM maven:3.8.4-openjdk-17 AS build

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar o arquivo pom.xml
COPY pom.xml .

# Copiar os arquivos fonte do projeto
COPY src ./src

# Compilar a aplicação
RUN mvn clean package -DskipTests

# Estágio final
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copiar o arquivo JAR do estágio de build
COPY --from=build /app/target/*.jar app.jar

# Expor a porta que sua aplicação utiliza
EXPOSE 8080

# Comando para executar a aplicação
CMD ["java", "-jar", "app.jar"]