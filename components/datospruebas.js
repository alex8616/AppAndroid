//actualizar consumo mesa
Route::put('/update-consumo/{id}', [ConsumoController::class, 'ActualizarDatos']);

public function ActualizarDatos(Request $request){
    $idConsumo = $request->id;
    $consumo = Consumo::findOrFail($idConsumo);
    $consumo->CantidadPersonas = $request->CantidadPersonas;
    $consumo->Comentario = $request->Comentario;
    $consumo->cliente_id = $request->cliente_id;
    $consumo->save();

    $mesa = $request->mesa_id;

    if ($mesa != null && $mesa != $consumo->ambiente_mesa_id) {
        $mesaambiente = AmbienteMesa::where('id', $consumo->ambiente_mesa_id)->first();
        $mesaambiente->estado = "libre";
        $mesaambiente->save();

        $mesanueva = AmbienteMesa::where('id', $mesa)->first();
        $mesanueva->estado = "ocupado";
        $consumo->ambiente_mesa_id = $mesa;
        $consumo->save();
        $mesanueva->save();
    }
    return response()->json(['success' => true, 'message' => 'Actualización exitosa', 'data' => $consumo]);
}