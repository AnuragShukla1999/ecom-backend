<?php

// Assuming dbConnection is established earlier using mysqli_connect or mysqli object

function signup($req) {
    $email = $req['email'];
    $password = $req['password'];
    $name = $req['name'];

    // Check if email and password are provided
    if (empty($email) || empty($password)) {
        $response = [
            'status' => 401,
            'message' => 'Please enter your email and password'
        ];
        return json_encode($response);
    }

    // Establish database connection (replace with your database credentials)
    $dbConnection = mysqli_connect("localhost", "username", "password", "database_name");

    if (!$dbConnection) {
        $response = [
            'status' => 500,
            'message' => 'Database connection error: ' . mysqli_connect_error()
        ];
        return json_encode($response);
    }

    // Check if email already exists
    $sql = "SELECT email FROM users WHERE email = ?";
    $stmt = mysqli_prepare($dbConnection, $sql);
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);

    if (mysqli_stmt_num_rows($stmt) > 0) {
        mysqli_stmt_close($stmt);
        mysqli_close($dbConnection);
        $response = [
            'status' => 409,
            'message' => 'Email has already been registered'
        ];
        return json_encode($response);
    }

    mysqli_stmt_close($stmt);

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert new user into database
    $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($dbConnection, $sql);
    mysqli_stmt_bind_param($stmt, "sss", $name, $email, $hashedPassword);
    $success = mysqli_stmt_execute($stmt);

    if ($success) {
        $response = [
            'status' => 201,
            'message' => 'User created successfully'
        ];
    } else {
        $response = [
            'status' => 500,
            'message' => 'Error creating user: ' . mysqli_error($dbConnection)
        ];
    }

    mysqli_stmt_close($stmt);
    mysqli_close($dbConnection);

    return json_encode($response);
}

// Example usage assuming $req is populated from POST data
$req = [
    'email' => $_POST['email'],
    'password' => $_POST['password'],
    'name' => $_POST['name']
];

echo signup($req);
?>











<?php

// Assuming dbConnection is established earlier using mysqli_connect or mysqli object

function signin($req) {
    $email = $req['email'];
    $password = $req['password'];

    // Check if email and password are provided
    if (empty($email) || empty($password)) {
        $response = [
            'status' => 401,
            'message' => 'Please provide email and password'
        ];
        return json_encode($response);
    }

    // Establish database connection (replace with your database credentials)
    $dbConnection = mysqli_connect("localhost", "username", "password", "database_name");

    if (!$dbConnection) {
        $response = [
            'status' => 500,
            'message' => 'Database connection error: ' . mysqli_connect_error()
        ];
        return json_encode($response);
    }

    // Query to fetch user by email
    $sql = "SELECT id, email, password FROM users WHERE email = ?";
    $stmt = mysqli_prepare($dbConnection, $sql);
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);

    // Check if user exists and verify password
    if (mysqli_stmt_num_rows($stmt) > 0) {
        mysqli_stmt_bind_result($stmt, $userId, $dbEmail, $dbPassword);
        mysqli_stmt_fetch($stmt);

        if (password_verify($password, $dbPassword)) {
            // Password matches, generate JWT token
            $token = generateJWT($userId);

            // Set token in cookie (example)
            setcookie('access_token', $token, time() + 3600, '/'); // Example: token expires in 1 hour

            $response = [
                'status' => 201,
                'message' => 'Sign in successful'
            ];
        } else {
            // Incorrect password
            $response = [
                'status' => 402,
                'message' => 'Incorrect email or password'
            ];
        }
    } else {
        // User not found
        $response = [
            'status' => 402,
            'message' => 'Incorrect email or password'
        ];
    }

    mysqli_stmt_close($stmt);
    mysqli_close($dbConnection);

    return json_encode($response);
}

// Function to generate JWT token
function generateJWT($userId) {
    // Replace with your JWT implementation logic
    $jwtPayload = [
        'id' => $userId
    ];
    $jwtSecret = 'your_jwt_secret'; // Replace with your JWT secret key
    return jwt_encode($jwtPayload, $jwtSecret);
}

// Example usage assuming $req is populated from POST data
$req = [
    'email' => $_POST['email'],
    'password' => $_POST['password']
];

echo signin($req);
?>
