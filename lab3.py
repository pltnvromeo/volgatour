import numpy as np

def sign(x):
    if x == 0.0:
        return 0
    elif x > 0.0:
        return 1
    else:
        return -1

def sqrt_method(A, B):
    n = len(A)
    S = np.zeros((n, n))
    D = np.zeros((n, n))

    # Нахождение элементов матриц S и D
    D[0][0] = sign(A[0][0])
    S[0][0] = np.sqrt(abs(A[0][0]))
    for j in range(1, n):
        S[0][j] = A[0][j] / (S[0][0] * D[0][0])

    for i in range(1, n):
        sum_s = 0
        for k in range(i):
            sum_s += S[k][i] * S[k][i] * D[k][k]
        D[i][i] = sign(A[i][i] - sum_s)
        S[i][i] = np.sqrt(abs(A[i][i] - sum_s))
        for j in range(i + 1, n):
            sum_s = 0
            for k in range(i):
                sum_s += S[k][i] * D[k][k] * S[k][j]
            S[i][j] = (A[i][j] - sum_s) / (S[i][i] * D[i][i])

    # Нахождение вектора y
    y = np.zeros(n)
    y[0] = B[0] / (S[0][0] * D[0][0])
    for i in range(1, n):
        sum_y = 0
        for k in range(i):
            sum_y += S[k][i] * D[k][k] * y[k]
        y[i] = (B[i] - sum_y) / (S[i][i] * D[i][i])

    # Нахождение вектора x
    x = np.zeros(n)
    x[n - 1] = y[n - 1] / S[n - 1][n - 1]
    for i in range(n - 2, -1, -1):
        sum_x = 0
        for k in range(i + 1, n):
            sum_x += S[i][k] * x[k]
        x[i] = (y[i] - sum_x) / S[i][i]
    return x

def main():
    n_gib = int(input("Введите размер матрицы Гильберта: "))

    # Инициализация матрицы Гильберта
    H = np.zeros((n_gib, n_gib))

    # Заполнение матрицы Гильберта
    for i in range(n_gib):
        for j in range(n_gib):
            H[i][j] = 1.0 / (i + j + 1)

    # Нахождение точного решения системы
    x1 = np.zeros(n_gib)
    N = 15
    for i in range(n_gib):
        x1[i] = N * (i + 1)

    print("\nТочное решение X1 матрицы Гильберта:")
    for i in range(n_gib):
        print(f"x1[{i + 1}] = {x1[i]}")

    # Поиск вектора правых частей B
    B_gib = np.dot(H, x1)

    print("\nВектор b матрицы Гильберта:")
    for i in range(n_gib):
        print(f"b[{i + 1}] = {B_gib[i]}")

    # Метод квадратного корня
    x_gib = sqrt_method(H, B_gib)

    print("\nРешение матрицы Гильберта методом квадратного корня:")
    for i in range(n_gib):
        print(f"X[{i + 1}] = {x_gib[i]}")

    # Евклидова норма
    norm = np.linalg.norm(x_gib - x1)
    print("\nЕвклидова норма:", norm)
if __name__ == "__main__":
    main()
