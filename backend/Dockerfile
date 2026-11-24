# ---------- Этап 1: сборка ----------
FROM golang:1.22 AS builder

WORKDIR /build

# Сначала только файлы зависимостей — этот слой кэшируется
COPY go.mod go.sum ./
RUN go mod download

# Потом весь код
COPY . .
# -ldflags="-s -w" убирает debug-информацию — образ меньше
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /out/app ./main.go

# ---------- Этап 2: исполнение ----------
# distroless/static — без shell, без пакетного менеджера, минимальная attack surface
FROM gcr.io/distroless/static-debian12:nonroot

WORKDIR /app
COPY --from=builder /out/app /app/app

# nonroot-вариант запускается под пользователем nonroot (uid 65532)
USER nonroot:nonroot

EXPOSE 8080

ENTRYPOINT ["/app/app"]
CMD []