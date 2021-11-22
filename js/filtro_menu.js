$(document).ready(function(){

	// AGREGANDO CLASE ACTIVE AL PRIMER ENLACE ====================
	$('.category_list .category_item[category="all"]').addClass('ct_item-active')

	// FILTRANDO  PRODUCTOS ==============================

	$('.category_item').click(function(){

		var catProcut= $(this).attr('category');
		console.log(catProcut);

		// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO============
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active')

		// OCULTAR PRODUCTOS  ==============================
		$('.product-item').css('transform', 'scale(0)');
		function hiddenProduct(){
			$('.product-item').hide();
		}setTimeout(hiddenProduct,400);
		

		// MOSTRAR PRODUCTOS ===============================}
		function showProducts(){

			$('.product-item[category='+catProcut+']').show();
			$('.product-item[category='+catProcut+']').css('transform', 'scale(1)');
		}setTimeout(showProducts, 400);
	})

	// MOSTRANDO TODOS LOS PRODUCTOS ============

	$('.category_item[category="all"]').click(function(){
		
		function showAll(){
			$('.product-item').show();
			$('.product-item').css('transform', 'scale(1)');
		}setTimeout(showAll,400)
		
	})
})