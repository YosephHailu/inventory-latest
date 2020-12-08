<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{!!csrf_token()!!}">

    <title>Inventory</title>
</head>

<body>
    <div id="app">

    </div>

    <script>
        window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token(),
            ]);
            ?>
    </script>
    //import main js file
    <script src="{{asset(url('js/app.js'))}}"></script>
</body>

</html>