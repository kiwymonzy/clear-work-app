class ServiceModel {
  constructor(response) {
    this.response_code = response.response_code || '';
    this.message = response.message || '';
    this.content = response.content ? new ContentModel(response.content) : {};
    this.errors = response.errors || [];
  }

  // Method to create an instance from JSON
  static fromJson(json) {
    return new ServiceModel({
      response_code: json.response_code,
      message: json.message,
      content: json.content,
      errors: json.errors,
    });
  }

  // Example method to check if data fetch was successful
  isSuccess() {
    return this.response_code === 'default_200';
  }
}

class ContentModel {
  constructor(content) {
    this.current_page = content.current_page || 1;
    this.data = content.data ? content.data.map(item => new DataModel(item)) : [];
    this.first_page_url = content.first_page_url || '';
    this.from = content.from || 0;
    this.last_page = content.last_page || 0;
    this.last_page_url = content.last_page_url || '';
    this.links = content.links || [];
    this.next_page_url = content.next_page_url || '';
    this.path = content.path || '';
    this.per_page = content.per_page || 0;
    this.prev_page_url = content.prev_page_url || null;
    this.to = content.to || 0;
    this.total = content.total || 0;
  }
}

class DataModel {
  constructor(data) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.short_description = data.short_description || '';
    this.description = data.description || '';
    this.cover_image = data.cover_image || '';
    this.thumbnail = data.thumbnail || '';
    this.category_id = data.category_id || '';
    this.sub_category_id = data.sub_category_id || '';
    this.tax = data.tax || 0;
    this.order_count = data.order_count || 0;
    this.is_active = data.is_active || 0;
    this.rating_count = data.rating_count || 0;
    this.avg_rating = data.avg_rating || 0;
    this.min_bidding_price = data.min_bidding_price || '';
    this.deleted_at = data.deleted_at || null;
    this.created_at = data.created_at || '';
    this.updated_at = data.updated_at || '';
    this.is_favorite = data.is_favorite || 0;
    this.variations_app_format = new VariationsAppFormatModel(data.variations_app_format || {});
    this.thumbnail_full_path = data.thumbnail_full_path || '';
    this.cover_image_full_path = data.cover_image_full_path || '';
    this.category = new CategoryModel(data.category || {});
    this.variations = data.variations ? data.variations.map(variation => new VariationModel(variation)) : [];
    this.service_discount = data.service_discount ? data.service_discount.map(discount => new DiscountModel(discount)) : [];
    this.campaign_discount = data.campaign_discount || [];
    this.translations = data.translations || [];
    this.storage_thumbnail = data.storage_thumbnail || null;
    this.storage_cover_image = data.storage_cover_image || null;
  }
}

class VariationsAppFormatModel {
  constructor(variationsAppFormat) {
    this.zone_id = variationsAppFormat.zone_id || '';
    this.default_price = variationsAppFormat.default_price || 0;
    this.zone_wise_variations = variationsAppFormat.zone_wise_variations ? variationsAppFormat.zone_wise_variations.map(variation => new ZoneWiseVariationModel(variation)) : [];
  }
}

class ZoneWiseVariationModel {
  constructor(zoneWiseVariation) {
    this.variant_key = zoneWiseVariation.variant_key || '';
    this.variant_name = zoneWiseVariation.variant_name || '';
    this.price = zoneWiseVariation.price || 0;
  }
}

class CategoryModel {
  constructor(category) {
    this.id = category.id || '';
    this.parent_id = category.parent_id || '';
    this.name = category.name || '';
    this.image = category.image || '';
    this.position = category.position || 0;
    this.description = category.description || null;
    this.is_active = category.is_active || 0;
    this.is_featured = category.is_featured || 0;
    this.created_at = category.created_at || '';
    this.updated_at = category.updated_at || '';
    this.image_full_path = category.image_full_path || '';
    this.zones_basic_info = category.zones_basic_info ? category.zones_basic_info.map(zone => new ZoneModel(zone)) : [];
    this.translations = category.translations || [];
    this.storage = category.storage || null;
  }
}

class ZoneModel {
  constructor(zone) {
    this.id = zone.id || '';
    this.name = zone.name || '';
    this.coordinates = new CoordinateModel(zone.coordinates || {});
    this.is_active = zone.is_active || 0;
    this.created_at = zone.created_at || '';
    this.updated_at = zone.updated_at || '';
    this.pivot = zone.pivot || {};
    this.translations = zone.translations || [];
  }
}

class CoordinateModel {
  constructor(coordinate) {
    this.type = coordinate.type || '';
    this.coordinates = coordinate.coordinates || [];
  }
}

class VariationModel {
  constructor(variation) {
    this.id = variation.id || 0;
    this.variant = variation.variant || '';
    this.variant_key = variation.variant_key || '';
    this.service_id = variation.service_id || '';
    this.zone_id = variation.zone_id || '';
    this.price = variation.price || 0;
    this.created_at = variation.created_at || '';
    this.updated_at = variation.updated_at || '';
    this.zone = new ZoneModel(variation.zone || {});
  }
}

class DiscountModel {
  constructor(discount) {
    this.id = discount.id || 0;
    this.discount_id = discount.discount_id || '';
    this.discount_type = discount.discount_type || '';
    this.type_wise_id = discount.type_wise_id || '';
    this.created_at = discount.created_at || '';
    this.updated_at = discount.updated_at || '';
    this.discount = new DiscountDetailsModel(discount.discount || {});
  }
}

class DiscountDetailsModel {
  constructor(discountDetails) {
    this.id = discountDetails.id || '';
    this.discount_title = discountDetails.discount_title || '';
    this.discount_type = discountDetails.discount_type || '';
    this.discount_amount = discountDetails.discount_amount || 0;
    this.discount_amount_type = discountDetails.discount_amount_type || '';
    this.min_purchase = discountDetails.min_purchase || 0;
    this.max_discount_amount = discountDetails.max_discount_amount || 0;
    this.limit_per_user = discountDetails.limit_per_user || 0;
    this.promotion_type = discountDetails.promotion_type || '';
    this.is_active = discountDetails.is_active || 0;
    this.start_date = discountDetails.start_date || '';
    this.end_date = discountDetails.end_date || '';
    this.created_at = discountDetails.created_at || '';
    this.updated_at = discountDetails.updated_at || '';
    this.translations = discountDetails.translations || [];
  }
}

export default ServiceModel;
