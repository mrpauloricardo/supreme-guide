# Etapa 1: Imagem base para compilar o projeto (Maven e JDK 22)
FROM maven:3.9.5-eclipse-temurin-22 AS build

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo pom.xml e outros arquivos de configuração do Maven
COPY pom.xml .

# Baixar as dependências do Maven (usando cache para otimizar builds)
RUN mvn dependency:go-offline -B

# Copiar o código-fonte para dentro do container
COPY src ./src

# Compilar o projeto e criar o JAR
RUN mvn clean package -DskipTests

# Etapa 2: Imagem base para executar o projeto (JDK 22)
FROM eclipse-temurin:22-jre-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar o JAR gerado da etapa de build para a imagem final
COPY --from=build /app/target/*.jar app.jar

# Expor a porta em que a aplicação será executada
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["java", "-jar", "app.jar"]
