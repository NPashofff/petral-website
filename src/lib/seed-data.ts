export interface SeedProduct {
  name: string;
  slug: string;
  description: string;
  price: number | null;
  category: string;
  brand: string;
  year: number;
  horsepower: string;
  engine: string;
  weight: string;
  images: string;
  featured: boolean;
}

export const seedProducts: SeedProduct[] = [
  {
    name: "Трактор TYM T2025P",
    slug: "traktor-tym-t2025p",
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "25 к.с.",
    engine: "Yanmar 3TNV80F-NXD, 1267 cc",
    weight: "853 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/traktor-tym-t2025p-1.png\",\"/images/products/traktor-tym-t2025p-2.png\"]",
    description: `<h3>Серия 2, Kомпактни Трактори</h3>
<h1>Модел T2025P</h1>
<p><strong>Основни характеристики:</strong><br />
Марка на двигателя: Yanmar<br />
Производителност: 25 к.с.<br />
Капацитет на повдигане на навесната система: 696 кг</p>
<p><strong>T2025P</strong> е субкомпактен трактор, създаден за производителност във всяко отношение.<br />
Той е доказателство, че наистина големи неща могат да се съдържат в малки опаковки.<br />
Предлагайки повишена мощност без компромис с маневреността, T2025P е оборудван с мощен двигател, осигурявайки едновременно висока производителност и комфорт на оператора.</p>
<p><strong>ОСНОВНИ ПРЕДИМСТВА:</strong></p>
<ul>
<li><strong>Компактен, но мощен:</strong> Идеален за работа в тесни пространства, като същевременно предлага достатъчно мощност за изпълнение на различни задачи.</li>
<li><strong>Подобрена производителност:</strong> Мощният двигател осигурява ефективна работа при косене, обработка на почвата и други приложения.</li>
<li><strong>Отлична маневреност:</strong> Малките размери и прецизното управление позволяват лесно маневриране около препятствия.</li>
<li><strong>Ергономичен дизайн:</strong> Интуитивно разположените контроли и комфортната операторска среда намаляват умората и повишават ефективността.</li>
</ul>
<p><a href="https://soland.bg/wp-content/uploads/2025/04/Snimka_zabelejka.png"><img loading="lazy" decoding="async" class="alignnone size-medium wp-image-447" src="https://soland.bg/wp-content/uploads/2025/04/Snimka_zabelejka-300x175.png" alt="" width="300" height="175" srcset="https://soland.bg/wp-content/uploads/2025/04/Snimka_zabelejka-300x175.png 300w, https://soland.bg/wp-content/uploads/2025/04/Snimka_zabelejka-768x449.png 768w, https://soland.bg/wp-content/uploads/2025/04/Snimka_zabelejka-600x351.png 600w, https://soland.bg/wp-content/uploads/2025/04/Snimka_zabelejka.png 951w" sizes="auto, (max-width: 300px) 100vw, 300px" /></a></p>
<p><em><strong>Важна забележка:</strong> Изображението на текущия модел е само с илюстративна цел. Наличните продукти, характеристики и спецификации могат да варират в зависимост от вашия регион.</em></p>
<p>&nbsp;</p>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Превъзходни екстри за оператора</strong><br />
Напълно оборудван с модерни удобства за максимален комфорт на оператора, този трактор разполага с голям държач за чаши, безжично зарядно за смартфон, множество USB портове за зареждане на лични устройства и Bluetooth колонка.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/04/t25_usp1_v2.jpeg" alt="Описание на екстрите на оператора" /></div>
<div></div>
</div>
<div></div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Дизелов двигател Yanmar с водно охлаждане и висок въртящ момент.</strong><br />
Двигателят Yanmar осигурява по-висок въртящ момент при по-ниски обороти в сравнение с конкурентите в своя клас.<br />
Със сертификат Stage V, той отговаря на строги екологични стандарти и стандарти за шум.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/04/t25_usp_2.jpg" alt="Описание на екстрите на оператора" /></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Голям капацитет на горивния резервоар за продължителна работа.</strong><br />
Големият капацитет на горивния резервоар позволява на трактора да работи по-дълго време без прекъсване за зареждане с гориво. В комбинация с икономичен двигател, това осигурява непрекъсната и ефективна работа през най-натоварените сезони.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="tym_na_t25_usp_3" alt="Описание на екстрите на оператора" /></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p>Прикрепен към дясната и лявата вертикални стойки на сгъваемата ROPS конструкция, този трактор предлага модулна система с три слота за светлини, работни лампи и високоговорители.<br />
В зависимост от предпочитанията на оператора и работните условия, могат да бъдат добавени още високоговорители и лампи.<br />
Това осигурява комфорт и безопасност на операторите както през деня, така и през нощта.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 293px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/4а.jpeg" alt="Описание на екстрите на оператора" width="556" /></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Подобрени детайли за намаляване на усилията на оператора</strong><br />
Оборудван с полезни функции, целящи да улеснят работата, този трактор включва нов дизайн на капачката на резервоара за по-добър захват и намаляване на ръчното усилие, както и по-ярък метален панел, проектиран да подобри информираността на оператора.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/04/t25_usp5_v2.jpeg" alt="Описание на екстрите на оператора" /></div>
</div>
</div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Комфортна и сигурна седалка</strong><br />
В допълнение към стандартния прибиращ се предпазен колан, седалката на този трактор може да издържи над 190 кг и е оборудвана с тежкотоварно механично окачване.<br />
Докато седалката осигурява комфорт, окачването действа като буфер при неравна повърхност, предпазвайки оператора в ситуации, където има риск от удар в долната част на гърба.<br />
Седалката може също да бъде ръчно регулирана според теглото на оператора, което позволява на всеки да намери най-оптималната позиция за седене.</p>
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/04/t25_usp6_v2-1.jpeg" alt="Описание на екстрите на оператора" /></div>
</div>
</div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>3-точкова навесна система</strong><br />
3-точковото окачване отзад предлага впечатляващ капацитет на повдигане, измерен до сферичните шарнири.<br />
Управлението на задния ВОМ (вал за отвеждане на мощност) позволява регулиране на оборотите в зависимост от задачата, като ги увеличава за по-интензивни приложения като косене и копаене.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/04/tym-na-t25-usp-5.png" alt="Описание на екстрите на оператора" /></div>
<div></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;"></div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
</div>
<div>
<p style="text-align: center;"><a style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 16px;" href="https://tym-new.euwest01.umbraco.io/media/fmckttdg/na_t25_360-_v2.mp4" target="_blank" rel="noopener">Виж ВИДЕО на TYM</a></p>
</div>
<p>&nbsp;</p>
<p><strong>ВСИЧКИ НЕОБХОДИМИ ХАРАКТЕРИСТИКИ ЗА УСПЕШНО ИЗВЪРШВАНЕ НА РАБОТАТА</strong><br />
Изпълнете широк спектър от задачи с трактор TYM Серия 1.<br />
Постигнете резултати по-бързо с мощен двигател с висок въртящ момент.</p>
<div style="display: flex; flex-direction: row; align-items: flex-start;">
<div style="flex: 1; margin-right: 10px;"><img decoding="async" style="max-width: 100%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/04/t25_frontleft.png" /></div>
<div style="flex: 1;"><img decoding="async" style="max-width: 100%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/04/t25_backright.png" /></div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; margin-bottom: 20px;">
<div style="width: 30%; text-align: center;">
<p>1. Двустепенна хидростатична трансмисия (HST)</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/04/1а.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>2. Трети хидравличен клапан (опция)</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/04/t25_feature2_v2.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>3. Два USB порта</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/04/t25_feature3_v2.jpeg" /></p>
</div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;">
<p>4. Водоустойчив Bluetooth високоговорител</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/04/t25_feature4_v2-1.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>5. Безжично зарядно за смартфон</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/04/5а.jpg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>6. Широко товарно пространство с кутия за инструменти<img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/04/t25_feature6_v2.jpeg" /></p>
</div>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>Техническа спецификация </strong></p>
<table class="table table-bordered table-hover table-condensed technical-data">
<thead>
<tr>
<th title="Field #1">Модел трактор</th>
<th title="Field #2">T2025P</th>
</tr>
</thead>
<tbody>
<tr>
<td>Двигател</td>
<td>Yanmar 3TNV80F-NXD</td>
</tr>
<tr>
<td>Мощност на двигателя</td>
<td>25 к.с. / 18.4 кВт</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td>Работен обем на двигателя</td>
<td>1267 куб. см</td>
</tr>
<tr>
<td>Брой предавки</td>
<td>F3xR3</td>
</tr>
<tr>
<td>Капацитет на повдигане на навесната система</td>
<td></td>
</tr>
<tr>
<td>Обороти на ВОМ</td>
<td>540/3000 об./мин.</td>
</tr>
<tr>
<td>Горивен резервоар</td>
<td>25 л</td>
</tr>
<tr>
<td>Обща дължина с 3-точково окачване</td>
<td>2829 мм</td>
</tr>
<tr>
<td>Обща ширина (със стандартни гуми)</td>
<td>1372 мм</td>
</tr>
<tr>
<td>Междуосие</td>
<td>1550 мм</td>
</tr>
<tr>
<td>Височина (със стандартни гуми)</td>
<td>2454 мм</td>
</tr>
<tr>
<td>Пътен просвет (със стандартни гуми)</td>
<td>216 мм</td>
</tr>
<tr>
<td>Собствена маса</td>
<td>853 кг</td>
</tr>
<tr>
<td>Тегло с кабина</td>
<td></td>
</tr>
<tr>
<td>Гуми &#8211; предни</td>
<td>6.0-12 4PR</td>
</tr>
<tr>
<td>Гуми &#8211; задни</td>
<td>9.5-20 6PR</td>
</tr>
</tbody>
</table>
<div></div>
<div><strong><br />
ПРИЛОЖЕНИЯ:</strong></div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p>Със своите компактни размери, малък радиус на завиване, интуитивни контроли и олекотен дизайн, субкомпактният трактор TYM е идеалната машина за всеки дом.<br />
Специализираната средно монтирана връзка позволява лесно прикачване на различни косачки, докато предните и задните връзки осигуряват допълнителна функционалност в сравнение с косачките за райграс.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 215px;" src="https://soland.bg/wp-content/uploads/2025/05/ikona-1.jpg" width="268" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ОБРАБОТКА НА ЗЕМЯ (ДОМАШНА ГРАДИНА)</strong><br />
Можете да използвате мултифункционалните възможности и лесна маневреност на T2025P за създаване и поддръжка на вашата домашна градина.<br />
От обработка на почвата и разпръскване на тор до аериране и засяване, този трактор е лесен за управление и смяна на прикачния инвентар, което ви позволява да отглеждате всякакви растения лесно и ефективно.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 213px;" src="https://soland.bg/wp-content/uploads/2025/09/rastenievadstvo-scaled.jpg" width="266" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ПОЧИСТВАНЕ</strong><br />
Извършвайте бързо и изгодно домакински задачи около вашия имот. От почистване на прах и мръсотия от алеята до повдигане и изхвърляне на паднали листа и други отпадъци, субкомпактният трактор на TYM предлага правилната комбинация от размер и мощност за маневреност и ефективна работа на двигателя.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 213px;" src="https://soland.bg/wp-content/uploads/2025/05/ikona-3.jpg" width="265" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ЖИВОТНОВЪДСТВО и ПТИЦЕВЪДСТВО</strong><br />
Удобен за седене и лесен за управление, субкомпактният трактор T2025P има лек дизайн и малък радиус на завиване, което го прави идеален помощник за поддръжка на животните във вашия дом. Изравнявайте двора, подрязвайте тревата, разпръсквайте фураж, премествайте бали сено, почиствайте отпадъци и много други.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 212px;" src="https://soland.bg/wp-content/uploads/2025/05/ikona-4.jpg" width="265" /></div>
<div></div>
</div>
<div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=23%2C569%2C602%2C630%2C677&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996082"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >име отбележете, продължите.**</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=23,569,602,630,677&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>
</div>`,
  },
  {
    name: "Трактор TYM T3048",
    slug: "traktor-tym-t3048",
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "48 к.с.",
    engine: "TYM T2300N2, 2287 cc",
    weight: "1464 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/traktor-tym-t3048-1.png\",\"/images/products/traktor-tym-t3048-2.jpg\"]",
    description: `<h3>Серия 3, Компактни Трактори</h3>
<h1>Модел T3048</h1>
<p><strong>Основни характеристики:</strong><br />
Производител на двигателя: TYM<br />
Мощност на двигателя: 48 к.с.<br />
Капацитет на повдигане (навес): 1500 кг</p>
<p><strong>КОМПАКТЕН ТРАКТОР БЕЗ КОМПРОМИС С ПРОИЗВОДИТЕЛНОСТТА</strong></p>
<p>Серия T3048 предлага перфектен баланс между маневреност и мощност.<br />
Мощната и същевременно компактната конструкция осигуряват универсално решение за справяне и с най-тежките задачи в различни работни условия.</p>
<p><a href="https://soland.bg/wp-content/uploads/2025/04/Snimka_zabelejka.png"><img loading="lazy" decoding="async" class="alignnone size-medium wp-image-447" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-ot-sait.png" alt="" width="300" height="175" /></a></p>
<p><em><strong>Важна забележка:</strong> Настоящият модел е само с илюстративна цел. Наличните продукти, функции и спецификации могат да варират в зависимост от вашия регион.<br />
.</em></p>
<p>&nbsp;</p>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong><br />
</strong>Екологичен 4-цилиндров двигател TYM проектиран и произведен от TYM, този трактор е създаден да бъде екологичен и горивно ефективен, без компромис с производителността.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/2a.jpeg" alt="Описание на екстрите на оператора" /></div>
<div></div>
</div>
<div></div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Регулируем волан</strong><br />
Накланящият се волан позволява на операторите да регулират позицията му за по-комфортно шофиране.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/3a.jpeg" alt="Описание на екстрите на оператора" /></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Бутон за включване/изключване на ВОМ</strong><br />
Безопасността е основен приоритет. Бутонът за ВОМ осигурява сигурна работа с всички прикачни устройства на трактора.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/4a.jpeg" alt="Описание на екстрите на оператора" /></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>LED работни светлини (опция)</strong><br />
Предните и задните LED работни светлини осигуряват по-безопасна работа, особено при условия на слаба видимост като дъждовна или прашна работна среда, или при задачи през нощта.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 299px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/5a.jpeg" alt="Описание на екстрите на оператора" width="567" /></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Система за блокиране на диференциала и малък ъгъл на завиване</strong><br />
Системата за блокиране на диференциала, активирана чрез леснодостъпни лостове, осигурява повишено сцепление в хлъзгава работна среда, докато 52-градусовият ъгъл на завиване значително улеснява работата в тесни пространства.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/6a.jpeg" alt="Описание на екстрите на оператора" /></div>
</div>
</div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Горивен филтър с воден сепаратор</strong><br />
Горивният филтър с воден сепаратор предотвратява попадането на чужди частици в горивото, осигурявайки по-добро стартиране на двигателя и предпазвайки горивната система от повреди.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/7a.jpeg" alt="Описание на екстрите на оператора" /></div>
<div></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;"></div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
</div>
<div>
<p style="text-align: center;"><a style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 16px;" href="https://tym-new.euwest01.umbraco.io/media/naplhbbr/na_4815_360-_v2.mp4" target="_blank" rel="noopener">Виж ВИДЕО на TYM</a></p>
</div>
<p>&nbsp;</p>
<p><strong>ВСИЧКО НЕОБХОДИМО ЗА ЕФЕКТИВНО ИЗПЪЛНЕНИЕ НА ЗАДАЧИТЕ</strong><br />
Трактор TYM Серия 3 ви дава възможност да извършвате разнообразни дейности с лекота и бързина.<br />
Насладете се на мощния двигател с висок въртящ момент за по-бързи резултати, лесния контрол на прикачните устройства чрез ВОМ, комфорта на ергономичната операторска кабина, която ви държи енергични през целия работен ден.</p>
<div style="display: flex; flex-direction: row; align-items: flex-start;">
<div style="flex: 1; margin-right: 10px;"><img decoding="async" style="max-width: 100%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-slaid-1.png" /></div>
<div style="flex: 1;"><img decoding="async" style="max-width: 100%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-slaid-2.png" /></div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; margin-bottom: 20px;">
<div style="width: 30%; text-align: center;">
<style>
@media (min-width: 769px) {<br />  /* Стилове за първия ред */<br />  body > div > div[style*="display: flex;"]:first-child {<br />    display: flex !important;<br />    flex-direction: row !important;<br />    flex-wrap: wrap !important;<br />    justify-content: space-between !important;<br />  }</p>
<p>  body > div > div[style*="display: flex;"]:first-child > div[style*="width: 30%; text-align: center;"] {<br />    width: 30% !important;<br />    text-align: center !important;<br />    display: flex !important; /* Добавяме flex към контейнера на текст и снимка */<br />    flex-direction: column !important; /* Подреждаме ги вертикално */<br />    justify-content: flex-start !important; /* Текстът отгоре */<br />    align-items: center !important; /* Центриране хоризонтално */<br />  }</p>
<p>  body > div > div[style*="display: flex;"]:first-child > div[style*="width: 30%; text-align: center;"] img {<br />    max-width: 80% !important;<br />    height: auto !important;<br />    margin-top: auto !important; /* Избутва снимката надолу */<br />  }</p>
<p>  /* Стилове за втория ред */<br />  body > div > div[style*="display: flex;"]:last-child {<br />    display: flex !important;<br />    flex-direction: row !important;<br />    flex-wrap: wrap !important;<br />    justify-content: space-between !important;<br />  }</p>
<p>  body > div > div[style*="display: flex;"]:last-child > div[style*="width: 30%; text-align: center;"] {<br />    width: 30% !important;<br />    text-align: center !important;<br />    display: flex !important; /* Добавяме flex към контейнера на текст и снимка */<br />    flex-direction: column !important; /* Подреждаме ги вертикално */<br />    justify-content: flex-start !important; /* Текстът отгоре */<br />    align-items: center !important; /* Центриране хоризонтално */<br />  }</p>
<p>  body > div > div[style*="display: flex;"]:last-child > div[style*="width: 30%; text-align: center;"] img {<br />    max-width: 80% !important;<br />    height: auto !important;<br />    margin-top: auto !important; /* Избутва снимката надолу */<br />  }<br />}<br /></style>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;">
<p>1. Нов, отличителен дизайн на предния капак</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/1.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>2. Омекотена седалка за по-комфортна работа</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/2.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>3. Ергономичен лост</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/3.jpeg" /></p>
</div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;">
<p>4. Високочувствителна F/R HST (F50HN)</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/4.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>5. Голям горивен резервоар</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/5.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>6. Ясно видим контролен панел</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/6.jpeg" /></p>
</div>
</div>
</div>
</div>
<p><strong>ИДЕАЛЕН ЗА РАЗЛИЧНИ ДЕЙНОСТИ</strong><br />
Компактен трактор с висока производителност.<br />
Серията предлага повишен капацитет на повдигане и компактни размери.<br />
От Stage-V двигателя до ергономичната платформа и подготвения за трета функция заден навес, тракторът е идеален за поддръжка на тревни площи, градини, дворни работи и домашни ферми. Възможност за прикачване на челен товарач, косачка и други приспособления за повече работа с един цикъл.</p>
<p>&nbsp;</p>
<p><strong>ТЕХНИЧЕСКА СПЕЦИФИКАЦИЯ </strong></p>
<table class="table table-bordered table-hover table-condensed technical-data">
<thead>
<tr>
<th title="Field #1">Модел трактор</th>
<th title="Field #2">T3048</th>
</tr>
</thead>
<tbody>
<tr>
<td>Двигател</td>
<td>TYM T2300N2</td>
</tr>
<tr>
<td>Мощност на двигателя</td>
<td>48 к.с.</td>
</tr>
<tr>
<td>Номинални обороти на двигателя</td>
<td></td>
</tr>
<tr>
<td>Работен обем на двигателя</td>
<td>2287 куб.см</td>
</tr>
<tr>
<td>Брой предавки</td>
<td>За F50Rn &#8211; F12xR12<br />
За F50Hn &#8211; безстепенна с 3 диапазона<br />
За F50Cn &#8211; F12xR12<br />
За F50Chn &#8211; безстепенна с 3 диапазона</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td>Обороти на ВОМ</td>
<td>540 / 2600 об/мин<br />
540E /1760 об/мин</td>
</tr>
<tr>
<td>Горивен резервоар</td>
<td>33 л</td>
</tr>
<tr>
<td>Обща дължина с 3-точково окачване</td>
<td>3380 мм</td>
</tr>
<tr>
<td>Обща ширина (с основни гуми)</td>
<td>1325 мм</td>
</tr>
<tr>
<td>Междуосие</td>
<td>1670 мм</td>
</tr>
<tr>
<td>Височина (със стандартни гуми)</td>
<td>2251 мм</td>
</tr>
<tr>
<td>Пътен просвет (със стандартни гуми)</td>
<td>366.5 мм</td>
</tr>
<tr>
<td>Собствена маса</td>
<td>За F50Rn &#8211; 1473 кг<br />
За F50Hn &#8211; 1464 кг<br />
За F50Cn &#8211; 1636 кг<br />
За F50Chn &#8211; 1627 кг</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td>Гуми &#8211; предни</td>
<td>За F50Rn &#8211; 8.0-16<br />
За F50Hn &#8211; 8.0-16<br />
За F50Cn &#8211; 7-16/6PR<br />
За F50Chn &#8211; 7-16/6PR</td>
</tr>
<tr>
<td>Гуми &#8211; задни</td>
<td>За F50Rn &#8211; 12.4-24<br />
За F50Hn &#8211; 12.4-24<br />
За F50Cn &#8211; 11.2-24/8PR<br />
За F50Chn &#8211; 11.2-24/8PR</td>
</tr>
</tbody>
</table>
<div></div>
<div></div>
<div><strong>ПРИЛОЖЕНИЯ:</strong></div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ЗА ГРАДИНИ И ЛОЗЯ</strong><br />
Отличен за работа в тесни пространства, този трактор предлага мощен капацитет на повдигане и нивелиране.<br />
Оптимизиран за овощни градини, оранжерии, лозя и др.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 215px;" src="https://soland.bg/wp-content/uploads/2025/09/rastenievadstvo-scaled.jpg" width="268" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>СТРОИТЕЛСТВО</strong><br />
Повишеният капацитет на повдигане и прецизните контроли на скоростите спомагат за ефективното завършване на проекти – от прости задачи /като инсталиране на пощенска кутия/ до по-мащабни дейности /като изграждане на ограда/.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 213px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-2.jpg" width="266" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>СНЕГОПОЧИСТВАНЕ</strong><br />
Тракторите TYM са оборудвани с подобрени контроли на двигателя и по-големи горивни резервоари, което им позволява да изпълняват разнообразни задачи за по-дълго време, дори и при екстремно ниски температури.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 213px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-3.jpg" width="265" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p>&nbsp;</p>
</div>
<div></div>
</div>
<div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=23%2C569%2C602%2C630%2C677&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996082"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container">		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >отбележете, преди да</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div><div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=23,569,602,630,677&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>
</div>`,
  },
  {
    name: "Трактор TYM T1025",
    slug: "traktor-tym-t1025",
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "25 к.с.",
    engine: "Yanmar 3TNV76-UD, 1116 cc",
    weight: "768 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/traktor-tym-t1025-1.png\",\"/images/products/traktor-tym-t1025-2.png\"]",
    description: `<h1>Трактор TYM T1025 &#8211; ПРОЕКТИРАН ЗА ПРОИЗВОДИТЕЛНОСТ КАКТО ОТВЪН, ТАКА И ОТВЪТРЕ.</h1>
<p>Представяме ви трактор TYM T1025 &#8211; субкомпактен трактор, доказателство, че наистина големи неща могат да се съдържат в малки опаковки.<br />
Предлагайки повишена мощност без да жертва маневреността, той е оборудван със силен двигател и ергономични контроли за оператора, осигурявайки както производителност, така и комфорт.</p>
<p><strong>Основни характеристики:</strong><br />
Производител на двигател: YANMAR<br />
Мощност на двигателя 25 к.с.<br />
Капацитет на повдигане (навес) 551 кг</p>
<p>&nbsp;</p>
<p><a href="https://soland.bg/wp-content/uploads/2025/05/t255_composition_v2.png"><img loading="lazy" decoding="async" class="alignnone size-medium wp-image-447" src="https://soland.bg/wp-content/uploads/2025/05/t255_composition_v2.png" alt="" width="300" height="175" /></a></p>
<p><em><strong>Важна забележка:</strong> Настоящият модел е само за илюстративни цели. Наличните продукти, функции и спецификации могат да варират в зависимост от вашия регион.</em></p>
<p>&nbsp;</p>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Ергономични характеристики за повишена производителност</strong><br />
Просторна операторска кабина с равен под предлага добра видимост и достатъчно място за краката, осигурявайки комфортна работа.<br />
Всички контроли са на една ръка разстояние, включително въртящ се бутон за регулиране на височината на косене на средно монтираното оборудване.<br />
Педалът на газта, спирачният педал, блокажът на диференциала и ръчната спирачка са лесно достъпни на пода на кабината, разположени точно там, където очаквате да бъдат.<br />
Тези характеристики правят този трактор лесен за управление, дори и за неопитни водачи.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 301px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/2.jpg" alt="Описание на екстрите на оператора" width="572" /></div>
<div></div>
</div>
<div></div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Висок въртящ момент,дизелов двигател с водноохлаждане Yanmar</strong><br />
Произведеният в Япония двигател Yanmar предлага по-висок въртящ момент при по-ниски обороти в сравнение с конкурентите в своя клас.<br />
Той също така е сертифициран по Stage V, включително стандартите за шумовите изисквания.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/3.jpg" alt="Описание на екстрите на оператора" /></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>2-диапазонна HST (хидростатична трансмисия) за плавна работа</strong><br />
В комбинация с хидравличното управление на волана, отзивчивите два хидростатични диапазона на този трактор осигуряват плавно движение.<br />
Те намаляват необходимостта от усилия от страна на оператора, особено при работа с опционалните предни и задни прикачни устройства.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/4.jpg" alt="Описание на екстрите на оператора" /></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>3-точков навес с голям капацитет на повдигане</strong><br />
Задното 3-точково окачване има впечатляващ капацитет на повдигане.<br />
Управлението на задния ВОМ (вал за отвеждане на мощност) позволява регулиране на оборотите в зависимост от задачата, като ги увеличава за по-интензивна работа в почвата, като косене или копаене.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 300px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/5.jpg" alt="Описание на екстрите на оператора" width="569" /></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Средно монтирано окачване за косящи инструменти</strong><br />
То позволява лесен монтаж на косачка с ширина до 137 см.<br />
Височината на косене може лесно да се регулира по време на работа с помощта на въртящия се бутон , което позволява по-ефективна работа.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/6.jpg" alt="Описание на екстрите на оператора" /></div>
</div>
</div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Сгъваем ROPS (защитна конструкция при преобръщане) за съхранение в помещения с нисък таван</strong><br />
Защитната конструкция при преобръщане (ROPS) на трактора е проектирана да се сгъва, което позволява лесно съхранение в по-ниски гаражи или навеси.</p>
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/3a-1.jpeg" alt="Описание на екстрите на оператора" /></div>
</div>
</div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Контроли за ускоряване, забавяне, повдигане или спускане на прикачни устройства</strong><br />
Дори когато тракторът е в движение, специален лост за ВОМ (вал за отвеждане на мощност) може да се използва за увеличаване или намаляване на оборотите на прикачните устройства. Въртящият се бутон може да повдига и спуска тези устройства с предписаната скорост.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/8.jpg" alt="Описание на екстрите на оператора" /></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;"></div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;"><strong>HST (хидростатична трансмисия) за безстепенно регулиране на скоростта на движение</strong><br />
Отзивчивите хидростатични предавки предлагат плавно пътуване за операторите.<br />
Тези контроли намаляват необходимостта от усилия от страна на оператора при изпълнение на различни задачи, особено при работа с опционалния челен товарач.</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/09/IMG_5144_new.jpg" alt="Описание на екстрите на оператора" /></div>
<div></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;"></div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
</div>
<div>
<p style="text-align: center;"><a style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 16px;" href="https://tym-new.euwest01.umbraco.io/media/5gxj1ao3/na_t254_360-_reflex_v2.mp4" target="_blank" rel="noopener">Виж ВИДЕО на TYM</a></p>
</div>
<p>&nbsp;</p>
<p><strong>ВСИЧКИ НЕОБХОДИМИ ХАРАКТЕРИСТИКИ ЗА СВЪРШВАНЕ НА РАБОТА</strong><br />
Изпълнете широк спектър от задачи с този трактор от Серия 1.<br />
Постигнете резултати по-бързо с мощен двигател с висок въртящ момент, контролирайте лесно прикачните устройства с превключвател за ВОМ и останете енергични благодарение на ергономично проектираното работно място на оператора.</p>
<div style="display: flex; flex-direction: row; align-items: flex-start;">
<div style="flex: 1; margin-right: 10px;"><img decoding="async" style="max-width: 100%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/Slaid-1.png" /></div>
<div style="flex: 1;"><img decoding="async" style="max-width: 100%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/Slaid-2.png" /></div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; margin-bottom: 20px;">
<div style="width: 30%; text-align: center;">
<p>1. Лост за ВОМ (вал за отвеждане на мощност) за средни и задни обороти.</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/1a.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>2. 2-диапазонна хидростатична трансмисия (HST).</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/2a-1.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>3. Сензор за безопасност на седалката.</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/3a-2.jpeg" /></p>
</div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;">
<p>4. Лост за газта.</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/4a-1.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>5. Бутон за включване/изключване на ВОМ (вал за отвеждане на мощност).</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/5a-1.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>6. Въртящ се бутон за регулиране на височината на косене.<br />
<img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/6a-1.jpeg" /></p>
</div>
</div>
<p>&nbsp;</p>
<p><strong>ПРОЕКТИРАН ЗА ПРИЛОЖЕНИЯ ВЪВ И ОКОЛО ВАШАТА СОБСТВЕНОСТ</strong><br />
Този трактор ви позволява да надминете възможностите на косачката за райграс, без да правите компромис с лекотата на управление и маневреността.<br />
Мултифункционалните възможности и компактната рама се обединяват за категорично подобрение спрямо традиционните машини и инструменти за поддръжка.<br />
Използвайте този трактор, за да поддържате здрава морава, да създадете домашна градина, да се справите с работата в двора или да подготвите място за домашна ферма.<br />
Точките за свързване на челен товарач, средно монтирано и задно окачване ви позволяват да прикачите различни приспособления за изпълнение на задачи.</p>
<p>&nbsp;</p>
<p><strong>ТЕХНИЧЕСКА СПЕЦИФИКАЦИЯ </strong></p>
<table class="table table-bordered table-hover table-condensed technical-data">
<thead>
<tr>
<th title="Field #1">Модел трактор</th>
<th title="Field #2">T1025</th>
</tr>
</thead>
<tbody>
<tr>
<td>Двигател</td>
<td>Yanmar 3TNV76-UD</td>
</tr>
<tr>
<td>Мощност на двигателя</td>
<td>25 к.с.</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td>Работен обем на двигателя</td>
<td>1116 куб. см</td>
</tr>
<tr>
<td>Брой предавки</td>
<td>F2xR2</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td>Обороти на ВОМ</td>
<td>540/2893 об/мин</td>
</tr>
<tr>
<td>Горивен резервоар</td>
<td>22 л</td>
</tr>
<tr>
<td>Обща дължина с 3-точково окачване</td>
<td>2668мм</td>
</tr>
<tr>
<td>Обща ширина (със стандартни гуми)</td>
<td>1288 мм</td>
</tr>
<tr>
<td>Междуосие</td>
<td>1460 мм</td>
</tr>
<tr>
<td>Височина (със стандартни гуми)</td>
<td>2252 мм</td>
</tr>
<tr>
<td>Пътен просвет (със стандартни гуми)</td>
<td>270 мм</td>
</tr>
<tr>
<td>Собствена маса</td>
<td>768 кг</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td>Гуми &#8211; Предни</td>
<td>6.0-12</td>
</tr>
<tr>
<td>Гуми &#8211; Задни</td>
<td>9.5-16</td>
</tr>
</tbody>
</table>
<div></div>
<div></div>
<div></div>
<div></div>
<div>
<p>&nbsp;</p>
<p><strong>ПРИЛОЖЕНИЯ</strong></p>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ОЗЕЛЕНЯВАНЕ</strong><br />
Със своите тесни размери, малък радиус на завиване, интуитивни контроли и лек дизайн, субкомпактният трактор TYM е идеалнат машина за всеки дом.<br />
Специалното средно монтирано окачване позволява лесно прикачване на различни косачки, докато предното и задното окачване осигуряват допълнителна функционалност в сравнение с косачките за райграс.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 215px;" src="https://soland.bg/wp-content/uploads/2025/05/ikona-1.jpg" width="268" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ГРАДИНАРСТВО</strong><br />
Със субкомпактния трактор TYM можете да използвате многофункционалните възможности и лекотата на маневриране, за да създадете и поддържате вашата домашна градина. От обработка на земята и разпръскване на тор до аериране и засяване на почвата, този трактор е лесен за управление и смяна на прикачни устройства, което ви позволява да отглеждате всякакви растения лесно и ефективно.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 213px;" src="https://soland.bg/wp-content/uploads/2025/09/rastenievadstvo-scaled.jpg" width="266" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ПОЧИСТВАНЕ</strong><br />
Справяйте се бързо и ефективно със задачите около дома си.<br />
От почистване на прах и мръсотия от алеята до повдигане и изхвърляне на паднали листа и други отпадъци, субкомпактният трактор TYM предлага подходящата комбинация от размер и мощност за маневреност и ефективна работа на двигателя.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 213px;" src="https://soland.bg/wp-content/uploads/2025/05/ikona-3.jpg" width="265" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ДОМАШНИ ЖИВОТНИ И ПТИЦИ</strong><br />
Комфортен за седене и лесен за управление, субкомпактният трактор TYM има лек дизайн и малък радиус на завиване, което помага при поддръжката на домашни животни.<br />
Нивелирайте двора, подрязвайте тревата, премествайте бали сено, почиствайте отпадъци и много други.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 212px;" src="https://soland.bg/wp-content/uploads/2025/05/ikona-4.jpg" width="265" /></div>
<div></div>
</div>
<div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=23%2C569%2C602%2C630%2C677&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996082"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div><div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >име Email съобщение</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=23,569,602,630,677&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>
</div>`,
  },
  {
    name: "Трактор TYM T5068",
    slug: "traktor-tym-t5068",
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "67 к.с.",
    engine: "Deutz TCD2.9L4, 2925 cc",
    weight: "2595 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/traktor-tym-t5068-1.png\",\"/images/products/traktor-tym-t5068-2.png\"]",
    description: `<h3>Серия 5, Универсални Трактори</h3>
<h1>Модел Т5068</h1>
<p><strong>Основни характеристики:</strong><br />
Производител на двигателя &#8211; DEUTZ<br />
Мощност на двигателя: 67 к.с.<br />
Капацитет на повдигане (навес): 1987 кг</p>
<p><strong>КОМПАКТЕН УНИВЕРСАЛЕН ТРАКТОР, ОБЕДИНЯВАЩ НАЙ-НОВИТЕ ТЕХНОЛОГИИ В ПРОИЗВОДИТЕЛНОСТТА.</strong><br />
T5068 е въплъщение на дългогодишния опит на TYM в индустрията за селскостопанско оборудване, отразявайки техния подход към технологиите и земеделието.<br />
Той безпроблемно съчетава мощна производителност с удобни функции, представени в иновативен и изискан дизайн.</p>
<figure id="attachment_632" aria-describedby="caption-attachment-632" style="width: 300px" class="wp-caption alignnone"><a href="https://soland.bg/wp-content/uploads/2025/05/1-s-zabelejka.png"><img loading="lazy" decoding="async" class="wp-image-632 size-medium" src="https://soland.bg/wp-content/uploads/2025/05/1-s-zabelejka-300x175.png" alt="Трактори TYM T68" width="300" height="175" srcset="https://soland.bg/wp-content/uploads/2025/05/1-s-zabelejka-300x175.png 300w, https://soland.bg/wp-content/uploads/2025/05/1-s-zabelejka-768x449.png 768w, https://soland.bg/wp-content/uploads/2025/05/1-s-zabelejka-600x351.png 600w, https://soland.bg/wp-content/uploads/2025/05/1-s-zabelejka.png 951w" sizes="auto, (max-width: 300px) 100vw, 300px" /></a><figcaption id="caption-attachment-632" class="wp-caption-text">Трактори с марка TYM модел T5068</figcaption></figure>
<p><em><strong>Важна забележка:</strong> Настоящият модел е само с илюстративна цел. Наличните продукти, функции и спецификации могат да варират в зависимост от вашия регион.<br />
.</em></p>
<p>&nbsp;</p>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Сертифициран по EU Stage V двигател Deutz</strong><br />
Произведени с прецизно немско инженерство, двигателите Deutz предлагат висока мощност и въртящ момент, дори при ниски обороти.<br />
Техният дълъг експлоатационен живот и висока надеждност ги правят идеален избор за повишаване на производителността.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/2-1.jpg" /></div>
<div></div>
</div>
<div></div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Безжично зарядно, нагревател и охладител за чаши</strong><br />
Безжичното зарядно за смартфон и нагревателят и охладителят за чаши осигуряват комфорт по време на дълги работни часове. (Предлага се само за избрани модели)</p>
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/3-1.jpg" alt="Описание на екстрите на оператора" /></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>4-секционни задни хидравлични клапани.</strong></p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/4-1.jpg" alt="Описание на екстрите на оператора" /></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Електронна хидравлична система за управление с BOSCH</strong><br />
Немската електронна хидравлична система за управление BOSCH позволява лесно управление на прикачните устройства и хидравличните функции, автоматично хоризонтално нивелиране и контроли на чувствителността. (Предлага се само за избрани модели)</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 299px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/5-1.jpg" alt="Описание на екстрите на оператора" width="567" /></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Комфортна седалка с окачване.</strong><br />
Комфортните седалки с окачване осигуряват отлично качество на возене и минимизират умората по време на дълги часове работа.</p>
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/6-1.jpg" alt="Описание на екстрите на оператора" /></div>
</div>
</div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Слънцезащитна козирка</strong><br />
Тя осигурява максимална видимост, предотвратявайки отблясъците от слънцето по време на работа през деня. (Предлага се само за избрани модели)</p>
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" style="max-width: 100%; height: auto; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/7-1.jpg" alt="Описание на екстрите на оператора" /></div>
<div></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;"></div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
</div>
<div>
<p style="text-align: center;"><a style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 16px;" href="https://tym-new.euwest01.umbraco.io/media/eefanaas/intl_t68_360_v2.mp4" target="_blank" rel="noopener">Виж ВИДЕО на TYM</a></p>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<div style="display: flex; flex-direction: row; align-items: flex-start;">
<div style="flex: 1; margin-right: 10px;"><img decoding="async" style="max-width: 100%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/1-s-otbeliazvane.png" /></div>
<div style="flex: 1;"><img decoding="async" style="max-width: 100%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/2-s-otbeliazvane.png" /></div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; margin-bottom: 20px;">
<div style="width: 30%; text-align: center;">
<style>
@media (min-width: 769px) {<br />  /* Стилове за първия ред */<br />  body > div > div[style*="display: flex;"]:first-child {<br />    display: flex !important;<br />    flex-direction: row !important;<br />    flex-wrap: wrap !important;<br />    justify-content: space-between !important;<br />  }</p>
<p>  body > div > div[style*="display: flex;"]:first-child > div[style*="width: 30%; text-align: center;"] {<br />    width: 30% !important;<br />    text-align: center !important;<br />    display: flex !important; /* Добавяме flex към контейнера на текст и снимка */<br />    flex-direction: column !important; /* Подреждаме ги вертикално */<br />    justify-content: flex-start !important; /* Текстът отгоре */<br />    align-items: center !important; /* Центриране хоризонтално */<br />  }</p>
<p>  body > div > div[style*="display: flex;"]:first-child > div[style*="width: 30%; text-align: center;"] img {<br />    max-width: 80% !important;<br />    height: auto !important;<br />    margin-top: auto !important; /* Избутва снимката надолу */<br />  }</p>
<p>  /* Стилове за втория ред */<br />  body > div > div[style*="display: flex;"]:last-child {<br />    display: flex !important;<br />    flex-direction: row !important;<br />    flex-wrap: wrap !important;<br />    justify-content: space-between !important;<br />  }</p>
<p>  body > div > div[style*="display: flex;"]:last-child > div[style*="width: 30%; text-align: center;"] {<br />    width: 30% !important;<br />    text-align: center !important;<br />    display: flex !important; /* Добавяме flex към контейнера на текст и снимка */<br />    flex-direction: column !important; /* Подреждаме ги вертикално */<br />    justify-content: flex-start !important; /* Текстът отгоре */<br />    align-items: center !important; /* Центриране хоризонтално */<br />  }</p>
<p>  body > div > div[style*="display: flex;"]:last-child > div[style*="width: 30%; text-align: center;"] img {<br />    max-width: 80% !important;<br />    height: auto !important;<br />    margin-top: auto !important; /* Избутва снимката надолу */<br />  }<br />}<br /></style>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;">
<p>1. Предна част тип &#8222;тигрова муцуна&#8220;</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/1а.jpg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>2. Ключ за изключване на акумулатора</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/2а.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>3. Електронен педал тип &#8222;орган&#8220;</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/3а.jpeg" /></p>
</div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;">
<p>4. LED вътрешно осветление</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/4а-1.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>5. Система за блокиране на диференциала</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/5а.webp" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>6. Външни бутони за управление на навесната система</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/6a.png" /></p>
</div>
</div>
</div>
</div>
<p><strong>ЗА ВАШИЯ ИМОТ И ОКОЛНОСТИ</strong><br />
Този компактен универсален трактор има висок капацитет на повдигане на навесната система и опционален челен товарач, което го прави идеален за пренасяне на по-тежки товари и свързване към по-големи прикачни устройства.<br />
С първокласна операторска кабина, оборудвана с джойстик за управление на челни товарачи и електронно управлявани клапани за задни прикачни устройства, той предлага всички удобства, необходими за продуктивно изпълнение на задачите ви.<br />
Маневреността и мощността се съчетават в тази машина, така че можете да се справите с увереност с редица опрерации.<br />
Този трактор може да ви помогне при грижата за животните, разчистването на земя, преместването на материали, грижа за тревни площи и много други.</p>
<p>&nbsp;</p>
<p><strong>Техническа спецификация </strong></p>
<table class="table table-bordered table-hover table-condensed technical-data">
<thead>
<tr>
<th title="Field #1">Модел трактор</th>
<th title="Field #2">T5068</th>
</tr>
</thead>
<tbody>
<tr>
<td>Двигател</td>
<td>Deutz TCD2.9L4</td>
</tr>
<tr>
<td>Мощност на двигателя</td>
<td>67 к.с.</td>
</tr>
<tr>
<td>Номинални обороти на двигателя</td>
<td></td>
</tr>
<tr>
<td>Работен обем на двигателя</td>
<td>2925 куб.см</td>
</tr>
<tr>
<td>Брой предавки</td>
<td>F24xR24 (с пълзящи предавки)</td>
</tr>
<tr>
<td>Капацитет на повдигане на навесната система</td>
<td></td>
</tr>
<tr>
<td>Обороти на ВОМ</td>
<td>540 / 2200 об/мин<br />
540E / 2199 об/мин<br />
540E / 2201 об/мин</td>
</tr>
<tr>
<td>Горивен резервоар</td>
<td>70 л</td>
</tr>
<tr>
<td>Обща дължина с 3-точковa навесна система</td>
<td>3982 мм</td>
</tr>
<tr>
<td>Обща ширина (със стандартни гуми)</td>
<td>1952 мм</td>
</tr>
<tr>
<td>Междуосие</td>
<td>2155 мм</td>
</tr>
<tr>
<td>Височина (със стандартни гуми)</td>
<td>2615 мм</td>
</tr>
<tr>
<td>Пътен просвет (със стандартни гуми)</td>
<td>440 мм</td>
</tr>
<tr>
<td></td>
</tr>
<tr>
<td>Собствена маса</td>
<td>2595 кг (мин.)<br />
2851 кг (макс.)</td>
</tr>
<tr>
<td>Гуми &#8211; Предни</td>
<td>11.2-20 8PR</td>
</tr>
<tr>
<td>Гуми &#8211; Задни</td>
<td>14.9-30 8PR</td>
</tr>
</tbody>
</table>
<div></div>
<div><strong><br />
ПРИЛОЖЕНИЯ:</strong></div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ЖИВОТНОВЪДСТВО И ПТИЦЕВЪДСТВО</strong><br />
Независимо дали искате да построите и поддържате скромен кокошарник, функционален хамбар или обширна конюшня, компактният универсален трактор TYM ви осигурява многофункционалните възможности да обхванете цялото стопанство.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 215px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-1.jpg" width="268" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>РАЗЧИСТВАНЕ НА ТЕРЕНИ И ГОРСКО СТОПАНСТВО</strong><br />
От премахване на мъртви растения до изкоренени пънове, този трактор може да поддържа земята ви или да я разчисти за следващия ви голям проект.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 213px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-2-1.jpg" width="266" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>РАБОТА С МАТЕРИАЛИ</strong><br />
Съвместим с прикачни устройства като челни товарачи, които ви помагат да свършите повече работа за по-малко време, този трактор ви осигурява мощността и контрола, необходими за изпълнение на всякакъв вид задачи.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 213px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-3-1.jpg" width="265" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ОЗЕЛЕНЯВАНЕ</strong><br />
Оформете пространството според вашите идеи с правилните инструменти.<br />
С по-голям капацитет на резервоара, подобрени контроли за прикачни устройства и по-високи скорости на движение, този трактор помага да превърнете необработена земя в процъфтяващи площи.</p>
</div>
<div style="flex: 1;">
<p><img decoding="async" class="" style="max-width: 100%; height: 212px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-4.jpg" width="265" /></p>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=23%2C569%2C602%2C630%2C677&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996082"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container">		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >Email отбележете, име</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div><div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=23,569,602,630,677&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>
</div>
</div>`,
  },
  {
    name: "Трактор TYM T5075",
    slug: "traktor-tym-t5075",
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "74 к.с.",
    engine: "Deutz TCD2.9L4, 2925 cc",
    weight: "2835 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/traktor-tym-t5075-1.png\",\"/images/products/traktor-tym-t5075-2.jpg\"]",
    description: `<h3>Серия 5, Универсални Трактори</h3>
<h1>Модел T5075</h1>
<p><strong>Основни характеристики:</strong><br />
Производител на двигателя: Deutz<br />
Мощност на двигателя: 74 к.с.<br />
Номинални обороти на двигателя: 2200 об/мин</p>
<p><strong>КОМПАКТЕН УНИВЕРСАЛЕН ТРАКТОР, ИНТЕГРИРАЩ НАЙ-НОВИТЕ ТЕХНОЛОГИИ В ПРОИЗВОДИТЕЛНОСТТА.</strong><br />
Трактор T5075 е въплъщение на дългогодишния опит на TYM в индустрията за селскостопанско оборудване, отразявайки подходът им към технологиите и земеделието.<br />
Той безпроблемно съчетава мощна производителност с удобни функции, показани в иновативен и изискан дизайн.</p>
<p>&nbsp;</p>
<p><a href="https://soland.bg/wp-content/uploads/2025/04/Snimka_zabelejka.png"><img loading="lazy" decoding="async" class="alignnone size-medium wp-image-447" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-zabelejka.png" alt="" width="300" height="175" /></a></p>
<p><em><strong>Важна забележка:</strong> Настоящият модел е само за илюстративни цели. Наличните продукти, характеристики и спецификации могат да варират в зависимост от вашия регион.</em></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Сертифициран по EU Stage V двигател Deutz</strong><br />
Произведени с прецизно немско инженерство, двигателите Deutz предлагат висока мощност и въртящ момент, дори при ниски обороти.<br />
Техният по-дълъг експлоатационен живот и висока надеждност ги правят идеален избор за повишаване на производителността.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 293px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/2-2.jpg" alt="Описание на екстрите на оператора" width="555" /></div>
<div></div>
</div>
<div></div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Безжично зарядно устройство, нагревател и охладител за чаши</strong><br />
Oсигуряват комфорт по време на дълги часове работа. (Предлага се само за избрани модели)</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 369px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/3_new.jpg" alt="Описание на екстрите на оператора" width="554" /></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>4-секционни задни хидравлични клапани</strong><br />
Намира се в задната част на трактора и позволява лесно управление на инвентар с различни функции.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 245px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/4_New.jpg" alt="Описание на екстрите на оператора" width="558" /></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Електронна хидравлична система за управление с BOSCH</strong><br />
Тя позволява лесно управление на прикачните устройства и хидравличните функции (Предлага се само за избрани модели)</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 293px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/5_new.jpg" alt="Описание на екстрите на оператора" width="556" /></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Комфортна седалка с окачване</strong><br />
Осигурява отлично качество на возене и минимизира умората по време на дълги часове работа.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 242px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/6-3.jpg" alt="Описание на екстрите на оператора" width="552" /></div>
</div>
</div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Сенник</strong><br />
Сенникът гарантира максимална видимост, като предотвратява отблясъците от слънцето по време на работа през деня. (Предлага се само за избрани модели)</p>
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 242px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/7-2.jpg" alt="Описание на екстрите на оператора" width="552" /></div>
</div>
</div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p>&nbsp;</p>
</div>
<div></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;"></div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
</div>
<div>
<p style="text-align: center;"><a style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 16px;" href="https://tym-new.euwest01.umbraco.io/media/eefanaas/intl_t68_360_v2.mp4" target="_blank" rel="noopener">Виж ВИДЕО на TYM</a></p>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<div style="display: flex; flex-direction: row; align-items: flex-start;">
<div style="flex: 1; margin-right: 10px;"><img decoding="async" style="max-width: 100%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/Slaid-1-1.png" /></div>
<div style="flex: 1;"><img decoding="async" style="max-width: 100%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/Slaid-2-1.png" /></div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; margin-bottom: 20px;">
<div style="width: 30%; text-align: center;">
<p>1. Предна решетка в стил &#8222;тигрова муцуна&#8220;</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/1a.jpg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>2. Ключ за изключване на акумулатора</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/2a-2.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>3. Електронен педал тип &#8222;орган&#8220;</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/3a-3.jpeg" /></p>
</div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;">
<p>4. LED вътрешно осветление</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/4a-2.jpeg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>5. Система за блокиране на диференциала</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/5a.jpg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>6. Външни бутони за управление на навесната система<br />
<img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/6a-2.jpeg" /></p>
</div>
</div>
<p><strong>ВАШИЯТ УНИВЕРСАЛЕН ПОМОЩНИК ЗА ИМОТА. </strong><br />
Този компактен трактор съчетава висока товароподемност, опционален товарач и удобна операторска кабина с интуитивни контроли.<br />
С лекота изпълнявайте разнообразни задачи около имота си – от пренасяне на тежки товари до работа с големи прикачни устройства.</p>
<p>&nbsp;</p>
<p><strong>Техническа спецификация </strong></p>
<table class="table table-bordered table-hover table-condensed technical-data">
<thead>
<tr>
<th title="Field #1">Модел трактор</th>
<th title="Field #2">T5075</th>
</tr>
</thead>
<tbody>
<tr>
<td>Двигател</td>
<td>Deutz TCD2.9L4</td>
</tr>
<tr>
<td>Мощност на двигателя</td>
<td>74 к.с. / 55.4 кВт</td>
</tr>
<tr>
<td>Номинални обороти на двигателя</td>
<td></td>
</tr>
<tr>
<td>Работен обем на двигателя</td>
<td>2925 куб. см</td>
</tr>
<tr>
<td>Брой предавки</td>
<td>F16xR16 (с пълзящи предавки)</td>
</tr>
<tr>
<td>Капацитет на повдигане на навесната система</td>
<td></td>
</tr>
<tr>
<td>Обороти на ВОМ</td>
<td>540/2200 об/мин<br />
540E / 2092 об/мин</td>
</tr>
<tr>
<td>Горивен резервоар</td>
<td>90 л</td>
</tr>
<tr>
<td>Обща дължина с 3-точковa навесна система</td>
<td>4269 мм</td>
</tr>
<tr>
<td>Обща ширина (със стандартни гуми)</td>
<td>2345 мм</td>
</tr>
<tr>
<td>Междуосие</td>
<td>2188 мм</td>
</tr>
<tr>
<td>Височина (със стандартни гуми)</td>
<td>2664 мм</td>
</tr>
<tr>
<td>Пътен просвет (със стандартни гуми)</td>
<td>467 мм</td>
</tr>
<tr>
<td>Собствена маса</td>
<td>2835 кг (мин.)<br />
3091 кг (макс.)</td>
</tr>
<tr>
<td>Тегло с кабина</td>
<td></td>
</tr>
<tr>
<td>Гуми &#8211; предни</td>
<td>11.2-24 8PR</td>
</tr>
<tr>
<td>Гуми &#8211; задни</td>
<td>16.9-30 8PR</td>
</tr>
</tbody>
</table>
<div></div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ПРИЛОЖЕНИЯ:</strong></p>
<p><strong>ЖИВОТНОВЪДСТВО И ПТИЦЕВЪДСТВО </strong><br />
Мултифункционалният трактор TYM е подходящ за всяка задача във фермата &#8211; от кокошарник до конюшня.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 215px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-1.jpg" width="268" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ГОРСКО СТОПАНСТВО </strong><br />
Т5075 е вашият надежден помощник за поддръжка и подготовка на земя.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 213px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-2-1.jpg" width="266" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p>Съвместим с прикачни устройства като челни товарачи, които ви помагат да свършите повече работа за по-малко време. Този трактор ви осигурява мощност и контрол за изпълнение на всякакъв вид работа.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 213px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-3-1.jpg" width="265" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ОЗЕЛЕНЯВАНЕ</strong><br />
Реализирайте мечтите си с подходящите средства.<br />
Благодарение на големият резервоар за гориво, усъвършенствани управления за инвентар и по-висока скорост на придвижване, трактор T5075 съдейства за превръщането на пуста земя в буйни зелени площи.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 212px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-4.jpg" width="265" /></div>
<div></div>
</div>
<div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=23%2C569%2C602%2C630%2C677&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996082"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >да Вашето Email</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div><div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=23,569,602,630,677&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>
</div>`,
  },
  {
    name: "Трактор TYM T6115",
    slug: "traktor-tym-t6115",
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "111 к.с.",
    engine: "Deutz TCD 3.6 L4 Common Rail, 3621 cc",
    weight: "4130 кг",
    price: null,
    featured: true,
    images: "[\"/images/products/traktor-tym-t6115-1.png\",\"/images/products/traktor-tym-t6115-2.png\",\"/images/products/traktor-tym-t6115-3.png\",\"/images/products/traktor-tym-t6115-4.png\",\"/images/products/traktor-tym-t6115-5.png\",\"/images/products/traktor-tym-t6115-6.png\",\"/images/products/traktor-tym-t6115-7.png\",\"/images/products/traktor-tym-t6115-8.png\",\"/images/products/traktor-tym-t6115-9.png\"]",
    description: `<h3>Серия 6, Универсални Трактори</h3>
<h1>Модел T6115</h1>
<p><strong>Основни характеристики:</strong><br />
Марка на двигателя: Deutz<br />
Производителност: 111 к.с.<br />
Капацитет на повдигане на навесната система &#8211; 3309 кг (опция: 3900 кг)</p>
<p>TYM T6115 e мощен универсален трактор, проектиран за най-тежките задачи.<br />
Той е разработен да отговори на нуждите на съвременното земеделие, съчетавайки оперативна ефективност с висока производителност.<br />
Подобреният капацитет на повдигане на навесната система от 3900 кг. и хидравлична трета точка се справят с лекота с трудни задачи.</p>
<p><a href="https://soland.bg/wp-content/uploads/2025/05/1-s-zabelejka.png"><img loading="lazy" decoding="async" class="wp-image-632 size-medium" src="https://soland.bg/wp-content/uploads/2025/05/t115_composition_v3.png" alt="Трактори TYM T68" width="300" height="175" /></a></p>
<p><em><strong>Важна забележка:</strong> Настоящият модел е само с илюстративна цел. Наличните продукти, функции и спецификации могат да варират в зависимост от вашия регион.</em></p>
<p>&nbsp;</p>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Двигател Deutz за изключителна производителност</strong><br />
Моделът T6115 е оборудван с TCD 3.6 L4 Common Rail двигател на Deutz с усъвършенствана електро-хидравлична система за управление на Bosch, който е отличен при задачи с висока интензивност.<br />
Този двигател предлага забележителна мощност и въртящ момент при по-ниски обороти, което увеличава устойчивостта и ефективността за продължителен период на употреба.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 299px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/2-3.jpg" alt="Описание на екстрите на оператора" width="568" /></div>
<div></div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Премиум кабина</strong><br />
Насладете се на панорамни гледки, лесен достъп през двете странични врати и набор от първокласни удобства в кабината, които повишават производителността, като същевременно дават приоритет на безопасността и благосъстоянието на водача.</p>
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 300px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/3_115.jpg" alt="Описание на екстрите на оператора" width="568" /></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>3-точкова навесна система с висок капацитет</strong><br />
Оборудван с 3-точкова навесна система с висок капацитет, която предлага опционален капацитет на повдигане от 3900 кг и е проектирана да се справя с тежки товари и разнообразен прикачен инвентар, този трактор осигурява сигурна и оптимална работа на вашите машини.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 300px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/6_115.jpg" alt="Описание на екстрите на оператора" width="568" /></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Издръжлива конструкция на предният мост.</strong><br />
Здравият преден мост на T6115 работи изключително ефективно в тежки условия, като постоянно предлага надеждно поемане на товар и дълготрайна конструкция на вътрешните планетарни редуктори. Той разполага и с голям 50-градусов ъгъл на завиване и оптимизирана геометрия за прецизен контрол, маневреност и намалено износване на гумите.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 300px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/5_115.jpg" alt="Описание на екстрите на оператора" width="569" /></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Пълна LED поддръжка</strong><br />
LED мигачи и работни светлини за подобрена видимост дори в най-тъмните условия.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 300px; display: block;" src="https://soland.bg/wp-content/uploads/2025/08/t115_usp_5_115.jpg" alt="Описание на екстрите на оператора" width="568" /></div>
</div>
</div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Задна мониторна система с TFT LCD дисплей </strong><br />
Използвайте удобния за потребителя монитор за достъп до важна информация, включително две камери (предна и/или задна), радио, телефон, мултимедия, данни за трактора и различни настройки.</p>
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 300px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/8_115.jpg" alt="Описание на екстрите на оператора" width="568" /></div>
</div>
</div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Смарт ключ с дистанционно стартиране и управление</strong><br />
Смарт ключът на T6115 позволява дистанционно стартиране на двигателя, управление на навесната система и стартиране/спиране с бутон за допълнително удобство.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 300px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/9_115.jpg" alt="Описание на екстрите на оператора" width="568" /></div>
<div></div>
</div>
</div>
<div></div>
<div></div>
<div><strong>СЪЧЕТАНИЕ ОТ ОПТИМАЛНА МОЩНОСТ И ЗДРАВА КОНСТРУКЦИЯ ЗА ПО-ДОБРИ РЕЗУЛТАТИ</strong><br />
С ефективен двигател, здрава трансмисия, мощни контроли за прикачен инвентар и луксозни удобства за оператора, този трактор от Серия 5 е създаден, за да ви помогне да изпълнявате и най-трудните задачи с по-голяма лекота и производителност.</div>
<div>
<div>
<p style="text-align: center;"><a style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 16px;" href="https://tym-new.euwest01.umbraco.io/media/haukihxr/na_t115_360-_v2.mp4" target="_blank" rel="noopener">Виж ВИДЕО на TYM</a></p>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<div style="display: flex; flex-direction: row; align-items: flex-start;">
<div style="flex: 1; margin-right: 10px;"><img decoding="async" style="max-width: 100%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/t115_frontleft.png" /></div>
<div style="flex: 1;"><img decoding="async" style="max-width: 100%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/t115_backright.png" /></div>
<div></div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; margin-bottom: 20px;">
<div style="width: 30%; text-align: center;">
<style>
@media (min-width: 769px) {<br />  /* Стилове за първия ред */<br />  body > div > div[style*="display: flex;"]:first-child {<br />    display: flex !important;<br />    flex-direction: row !important;<br />    flex-wrap: wrap !important;<br />    justify-content: space-between !important;<br />  }</p>
<p>  body > div > div[style*="display: flex;"]:first-child > div[style*="width: 30%; text-align: center;"] {<br />    width: 30% !important;<br />    text-align: center !important;<br />    display: flex !important; /* Добавяме flex към контейнера на текст и снимка */<br />    flex-direction: column !important; /* Подреждаме ги вертикално */<br />    justify-content: flex-start !important; /* Текстът отгоре */<br />    align-items: center !important; /* Центриране хоризонтално */<br />  }</p>
<p>  body > div > div[style*="display: flex;"]:first-child > div[style*="width: 30%; text-align: center;"] img {<br />    max-width: 80% !important;<br />    height: auto !important;<br />    margin-top: auto !important; /* Избутва снимката надолу */<br />  }</p>
<p>  /* Стилове за втория ред */<br />  body > div > div[style*="display: flex;"]:last-child {<br />    display: flex !important;<br />    flex-direction: row !important;<br />    flex-wrap: wrap !important;<br />    justify-content: space-between !important;<br />  }</p>
<p>  body > div > div[style*="display: flex;"]:last-child > div[style*="width: 30%; text-align: center;"] {<br />    width: 30% !important;<br />    text-align: center !important;<br />    display: flex !important; /* Добавяме flex към контейнера на текст и снимка */<br />    flex-direction: column !important; /* Подреждаме ги вертикално */<br />    justify-content: flex-start !important; /* Текстът отгоре */<br />    align-items: center !important; /* Центриране хоризонтално */<br />  }</p>
<p>  body > div > div[style*="display: flex;"]:last-child > div[style*="width: 30%; text-align: center;"] img {<br />    max-width: 80% !important;<br />    height: auto !important;<br />    margin-top: auto !important; /* Избутва снимката надолу */<br />  }<br />}<br /></style>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;">
<p>1. Седалка с въздушно окачване</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/1а_115.jpg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>2. Странични огледала</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/2а_115.jpg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>3. Ергономичен контролен център</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/3а_115.jpg" /></p>
</div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;">
<p>4. Задна камера</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/4а_115.jpg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>5. Педал тип &#8222;орган&#8220;</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/5а_115.jpg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>6. Хидравлична трета точка</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/6а_115.jpg" /></p>
</div>
</div>
</div>
</div>
<p><strong>СИЛА И ГЪВКАВОСТ ЗА ВСЯКА РАБОТА</strong><br />
От строителни обекти до жътварски полета, здравият T6115 е вашият идеален партньор за всеки проект. Неговият подобрен капацитет на мощност и напреднала технология осигуряват превъзходна производителност с минимален разход на гориво и екологични емисии.<br />
Оборудван с гъвкавост, подходяща за земеделие, и мощност за разчистване на терени и транспортиране на материали, T6115 разполага с автоматичен ВОМ (вал за отвеждане на мощност) с функции за повдигане и спускане, гарантиращ стабилност и плавно возене.</p>
<p>&nbsp;</p>
<p><strong>ТЕХНИЧЕСКА СПЕЦИФИКАЦИЯ </strong></p>
<table class="table table-bordered table-hover table-condensed technical-data">
<thead>
<tr>
<th title="Field #1">Модел трактор</th>
<th title="Field #2">T6115</th>
</tr>
</thead>
<tbody>
<tr>
<td>Двигател</td>
<td>Deutz TCD 3.6 L4</td>
</tr>
<tr>
<td>Мощност на двигателя</td>
<td>111 к.с. | 83 кВт</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td>Работен обем</td>
<td>3621 куб. см</td>
</tr>
<tr>
<td>Брой предавки</td>
<td>
<p class="query-text-line ng-star-inserted">T115SP: F32xR32 с пълзящи предавки<br />
T115SC: F16xR16 с пълзящи предавки</p>
</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td>Заден ВОМ</td>
<td>540 / 2199 об./мин.<br />
540E / 2208 об./мин.<br />
1000 / 2130 об./мин.</td>
</tr>
<tr>
<td>Горивен резервоар</td>
<td>110 л</td>
</tr>
<tr>
<td>Обща дължина с 3-точково окачване</td>
<td>4470 мм</td>
</tr>
<tr>
<td>Обща ширина (със стандартни гуми)</td>
<td>2517мм</td>
</tr>
<tr>
<td>Междуосие</td>
<td>2360 мм</td>
</tr>
<tr>
<td>Височина (със стандартни гуми)</td>
<td>2740 мм</td>
</tr>
<tr>
<td>Пътен просвет (със стандартни гуми)</td>
<td>460 мм</td>
</tr>
<tr>
<td>Тегло с кабина</td>
</tr>
<tr>
<td>Собствена маса</td>
<td>4130 кг</td>
</tr>
<tr>
<td>Гуми &#8211; Предни</td>
<td>R2 13.6-24 8PR<br />
R2 13.6-24 6PR</td>
</tr>
<tr>
<td>Гуми &#8211; Задни</td>
<td>R2 18.4-34 10PR<br />
R2 18.4-34 10PR</td>
</tr>
</tbody>
</table>
</div>
<div></div>
<div></div>
<div></div>
<div><strong><br />
ПРИЛОЖЕНИЯ:</strong></div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ПРЕМЕСТВАНЕ НА МАТЕРИАЛИ</strong><br />
Максималният капацитет на повдигане отпред и на навесната система ви позволява да пренасяте големи обеми материали наведнъж, минимизирайки броя на курсовете и повишавайки оперативната ефективност.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 215px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-3-1.jpg" width="268" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>РАЗЧИСТВАНЕ НА ТЕРЕНИ И ГОРСКО СТОПАНСТВО</strong><br />
От захващане на мъртви растения до премахване на изкоренени пънове, този трактор може да поддържа вашата земя или да я разчисти за следващия ви голям проект.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 213px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-2-1.jpg" width="266" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>СТРОИТЕЛСТВО</strong><br />
Използвайте този трактор като основна машина за цял проект или в комбинация с друго строително оборудване, за да осъществите строителните си планове.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 213px;" src="https://soland.bg/wp-content/uploads/2025/05/snimka-s-ikona-3-2.jpg" width="265" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ОБРАБОТКА НА ЗЕМЯ</strong><br />
Оборудван с многофункционални възможности със здрава конструкция, T115 повишава производителността от подготовката на почвата и засяването до напояването и събирането на реколтата.</p>
</div>
<div style="flex: 1;">
<p><img decoding="async" class="" style="max-width: 100%; height: 212px;" src="https://soland.bg/wp-content/uploads/2025/09/rastenievadstvo-scaled.jpg" /></p>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=770%2C801%2C1088%2C1099%2C1096&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996083"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >Вашето Email Телефон</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=770,801,1088,1099,1096&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>`,
  },
  {
    name: "Трактор TYM T6130",
    slug: "traktor-tym-t6130",
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "127 к.с.",
    engine: "Deutz TCD 3.6 L4 Common Rail, 3621 cc",
    weight: "4470 кг",
    price: null,
    featured: true,
    images: "[\"/images/products/traktor-tym-t6130-1.png\",\"/images/products/traktor-tym-t6130-2.jpg\",\"/images/products/traktor-tym-t6130-3.png\",\"/images/products/traktor-tym-t6130-4.png\",\"/images/products/traktor-tym-t6130-5.png\",\"/images/products/traktor-tym-t6130-6.png\",\"/images/products/traktor-tym-t6130-7.png\",\"/images/products/traktor-tym-t6130-8.png\",\"/images/products/traktor-tym-t6130-9.png\",\"/images/products/traktor-tym-t6130-10.png\"]",
    description: `<h3>Серия 6, Utility трактори</h3>
<h1>Модел T6130</h1>
<p><strong>Основни характеристики:</strong><br />
Производител на двигател: DEUTZ<br />
Мощност на двигателя 127 к.с.<br />
Капацитет на повдигане (навес): 3747 кг</p>
<p><strong>ПРЕМИУМ УНИВЕРСАЛЕН ТРАКТОР, КОЙТО ПРЕОСМИСЛЯ СЪВЪРШЕНСТВОТО ЧРЕЗ ИНОВАЦИИ!</strong></p>
<p>Запознайте се с флагмана на TYM – модел T6130.<br />
Този универсален трактор съчетава елегантен дизайн с мощна производителност,<br />
включвайки най-нови интелигентни технологии и премиум характеристики.</p>
<p>&nbsp;</p>
<p><a href="https://soland.bg/wp-content/uploads/2025/05/t255_composition_v2.png"><img loading="lazy" decoding="async" class="alignnone size-medium wp-image-447" src="https://soland.bg/wp-content/uploads/2025/05/t130_composition_v2.png" alt="" width="300" height="175" /></a></p>
<p><em><strong>Важна забележка:</strong> Текущият модел е само с илюстративна цел. Наличните продукти, функции и технически характеристики<br />
могат да варират в зависимост от региона ви.</em></p>
<p>&nbsp;</p>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Високопроизводителен двигател Deutz.</strong><br />
T6130 е оборудван с двигател TCD 3.6 L4 – Deutz Common Rail, с усъвършенствана електрoхидравлична система за управление от Bosch,<br />
която се отличава при задачи с висока интензивност. Този двигател осигурява изключителна мощност и въртящ момент при по-ниски обороти, като по този начин допринася<br />
за по-голяма издръжливост и продуктивност също така и по-нисък разход на гориво през целия си жизнен цикъл.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 299px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/1_130.jpg" alt="Описание на екстрите на оператора" width="568" /></div>
<div></div>
</div>
<div></div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Премиум кабина</strong><br />
Насладете се на панорамни гледки, лесен достъп и изход през двете странични врати, както и на набор от първокласни удобства в кабината, които повишават<br />
продуктивността, като същевременно поставят на първо място безопасността.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 299px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/2_130.jpg" alt="Описание на екстрите на оператора" width="566" /></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%;"></div>
</div>
</div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p>Предният мост на модела T6130 се отличава с изключителна здравина при тежки условия, като осигурява надеждна товароносимост и дълготраен живот с външни планетарни предавки и диференциал с ограничено приплъзване.<br />
Здравата предна ос разполага с режим 4 Wheel Auto и впечатляващ ъгъл на завиване от 47 градуса за прецизен контрол, отлична маневреност и намалено износване на гумите.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 300px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/4_130.jpg" alt="Описание на екстрите на оператора" width="569" /></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p>Триточкова навесна система с висока товароносимост, която е проектирана да работи с тежки товари до 3 747 кг.или различни прикачни устройства, този трактор<br />
осигурява сигурна и оптимална работа на вашите земеделски инструменти. Здравата навесна система от категория 2 с висока товароносимост позволява бързо и лесно свързване<br />
на различни прикачни инвентари.</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 300px; display: block;" src="https://soland.bg/wp-content/uploads/2025/09/t6130_high-capacity-3-point-hitch_optimized_NEW.jpg" alt="Описание на екстрите на оператора" width="568" /></div>
</div>
</div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>Функционални характеристики</strong><br />
Тези лостове и контроли улесняват задачи като смяна на предавките и управление на инвентара, осигурявайки ефективност и лекота при работа.</p>
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 300px; display: block;" src="https://soland.bg/wp-content/uploads/2025/09/t6130_operational_features_optimized_NEW.jpg" alt="Описание на екстрите на оператора" width="568" /></div>
</div>
</div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p><strong>10.1-инчов сензорен монитор</strong><br />
10.1-инчовият монитор с Bluetooth функционалност осигурява лесен достъп до контролната система на трактора. Подробните страници за наблюдение ви позволяват да следите<br />
работата на двигателя, трансмисията и настройките на тристепенното навесно устройство, както и да получавате диагностични известия.<br />
Големият дисплей е идеален за наблюдение на камерите, монтирани отпред и отзад (задната камера е стандартно оборудване).</p>
</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 300px; display: block;" src="https://soland.bg/wp-content/uploads/2025/09/t6130_1-inch-touchscreen-monitor_optimized_NEW.jpg" alt="Описание на екстрите на оператора" width="569" /></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;"></div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;"><strong>Умен ключ с дистанционно стартиране и управление</strong><br />
Умният ключ на модела T6130 позволява дистанционно стартиране на двигателя, управление на навесното устройство и стартиране/спиране с натискане на бутон за допълнително удобство.</div>
<div style="flex: 1; max-width: 50%;"><img decoding="async" class="" style="max-width: 100%; height: 301px; display: block;" src="https://soland.bg/wp-content/uploads/2025/05/8_130.jpg" alt="Описание на екстрите на оператора" width="570" /></div>
<div></div>
<div></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;"></div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
</div>
<div></div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start;">
<div style="flex: 1; max-width: 50%; padding-right: 20px;">
<p>&nbsp;</p>
</div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
</div>
<div>
<p style="text-align: center;"><a style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 16px;" href="https://tym-new.euwest01.umbraco.io/media/x2hdqe4r/na_t130_360-_v5.mp4" target="_blank" rel="noopener">Виж ВИДЕО на TYM</a></p>
</div>
<p>&nbsp;</p>
<p><strong>T6130 — ВАШИЯТ НОВ СТАНДАРТ ЗА МОЩ И ЕФЕКТИВНОСТ!</strong></p>
<p>Тракторът T6130 съчетава безкомпромисна мощност, интелигентни технологии и луксозни удобства, за да надмине всичките ви очаквания.<br />
С интуитивно управление и премиум характеристики, той не просто работи за вас — той ви води към ново ниво на производителност и успех.<br />
Изберете T6130 и усетете разликата още от първия оборот!</p>
<div style="display: flex; flex-direction: row; align-items: flex-start;">
<div style="flex: 1; margin-right: 10px;"><img decoding="async" style="max-width: 100%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/09/Snimka-s-opisania_130_new.png" /></div>
<div style="flex: 1;"><img decoding="async" style="max-width: 100%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/09/Snimka-s-opisania_130-grab_New.png" /></div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; margin-bottom: 20px;">
<div style="width: 30%; text-align: center;">
<p>1. Седалка с въздушно окачване</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/1a.png" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>2. Седалка за помощник</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/09/Sedalka-za-pomostnik_New.jpg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>3. Ергономичен център за управление</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/3a.png" /></p>
</div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;">
<p>4. Безжично зарядно устройство и поставка за чаша</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/4a.jpg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>5. Лост за превключване на предавки, APS и селектор за режими на управление</p>
<p><img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/05/5a-1.jpg" /></p>
</div>
<div style="width: 30%; text-align: center;">
<p>6. Хидравлична трета точка<br />
<img decoding="async" style="max-width: 80%; height: auto;" src="https://soland.bg/wp-content/uploads/2025/09/t6130_hydraulic-top-link_optimized_NEW_NEW-1.jpg" /></p>
</div>
</div>
<p>&nbsp;</p>
<p><strong>СЪЗДАДЕН ЗА РАБОТА ВЪВ И ОКОЛО ВАШИЯ ИМОТ</strong><br />
Представяме ви T6130 – вашия върховен източник на мощност. Този трактор предлага по-голям капацитет за постигане на максимална производителност с минимален разход на гориво.<br />
Освен че е щадящ към околната среда, той разполага с модерни технологии, които свеждат поддръжката до минимум и осигуряват непрекъсната продуктивност.<br />
Идеален за земеделие и животновъдство, T130 е оборудван с автоматичен ВОМ и функции за повдигане и спускане, които поддържат стабилност и осигуряват плавна работа.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>ТЕХНИЧЕСКА СПЕЦИФИКАЦИЯ </strong></p>
<table class="table table-bordered table-hover table-condensed technical-data">
<thead>
<tr>
<th title="Field #1">Модел трактор</th>
<th title="Field #2">T6130</th>
</tr>
</thead>
<tbody>
<tr>
<td>Двигател</td>
<td>Deutz TCD 3.6 L4</td>
</tr>
<tr>
<td>Мощност на двигателя</td>
<td>127 к.с. / 95 kW</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td>Работен обем на двигателя</td>
<td>3621 куб. см</td>
</tr>
<tr>
<td>Брой предавки</td>
<td>F36 x R36 със свръхбавни скорости</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td>Обороти на ВОМ</td>
<td>540 / 2199 об./мин<br />
540E / 2208 об./мин<br />
1000 /2227 об./мин</td>
</tr>
<tr>
<td>Обем на резервоара</td>
<td>190 литра</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td>Обща ширина (със стандартни гуми)</td>
<td>2447 мм</td>
</tr>
<tr>
<td>Междуосие</td>
<td>2590 мм</td>
</tr>
<tr>
<td>Височина (със стандартни гуми)</td>
<td>2958 мм</td>
</tr>
<tr>
<td>Просвет (със стандартни гуми)</td>
<td>551 мм</td>
</tr>
<tr>
<td>Собствена маса</td>
<td>4470 кг</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td>Гуми &#8211; предни</td>
<td>380/85R28 (Радиални стандартни)</td>
</tr>
<tr>
<td>Гуми &#8211; задни</td>
<td>460/85R38 (Радиални стандартни)</td>
</tr>
</tbody>
</table>
<div></div>
<div></div>
<div><strong>ПРИЛОЖЕНИЯ</strong></div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>ЕФЕКТИВНО ТРАНСПОРТИРАНЕ НА МАТЕРИАЛИ<br />
</strong>С максимален капацитет на повдигане както на предния, така и на задния навес, вие можете да превозвате големи количества товари едновременно. Така намалявате необходимостта от многократни курсове и подобрявате ефективността на работата.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 215px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-3-1.jpg" width="268" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>РАЗЧИСТВАНЕ НА ТЕРЕНИ И ГОРСКО СТОПАНСТВО<br />
</strong>Независимо дали премахвате изсъхнали растения или изкоренявате пънове, този трактор може да поддържа терена ви или да го разчисти за следващия ви голям проект.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 213px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-2-1.jpg" width="266" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>СТРОИТЕЛСТВО<br />
</strong>Използвайте този трактор като основна машина за целия си проект или в комбинация с друга строителна техника, за да осъществите визията си.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 213px;" src="https://soland.bg/wp-content/uploads/2025/05/Snimka-s-ikona-2.jpg" width="265" /></div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1; margin-right: 20px;">
<p><strong>РАСТЕНИЕВЪДСТВО</strong><br />
Снабден с разнообразни функции и здрав дизайн, този трактор повишава производителността във всеки етап – от подготовка на почвата и засяване, до напояване и жътва.</p>
</div>
<div style="flex: 1;"><img decoding="async" class="" style="max-width: 100%; height: 212px;" src="https://soland.bg/wp-content/uploads/2025/09/rastenievadstvo-scaled.jpg" width="265" /></div>
<div></div>
</div>
<div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=770%2C801%2C1088%2C1099%2C1096&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996083"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >Моля, Телефон Email</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div><div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=770,801,1088,1099,1096&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>
</div>`,
  },
  {
    name: "ATV Hisun Guardian 400",
    slug: "atv-hisun-guardian-400",
    category: "ATV",
    brand: "Hisun",
    year: 2026,
    horsepower: "28 к.с.",
    engine: "Едноцилиндров 4-такт SOHC, 400 cc, EFI",
    weight: "448 кг",
    price: null,
    featured: true,
    images: "[\"/images/products/atv-hisun-guardian-400-1.png\",\"/images/products/atv-hisun-guardian-400-2.png\",\"/images/products/atv-hisun-guardian-400-3.png\",\"/images/products/atv-hisun-guardian-400-4.png\",\"/images/products/atv-hisun-guardian-400-5.png\"]",
    description: `<h3>ATV</h3>
<h1>Hisun Guardian 400 Червен<br />
(предни и задни багажници, EPS и протектори за ръцете)</h1>
<p>Hisun Guardian 400 е идеалният многофункционален спътник както за любителите на приключенията, така и за тежки работни задачи. Със своя стабилен дизайн, мощен 400-кубиков двигател и 4&#215;4 задвижване на всички колела, той преодолява всеки терен с лекота. За разлика от моделите тип UTV, това е класическо ATV, предлагащо изключителна маневреност, висок полезен товар и издръжлива конструкция.</p>
<div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
<div><strong><span style="color: #ff0000;"><em>⚠ ВАЖНО: Наличен цвят: ЧЕРВЕН. (Снимките в други цветове са само илюстративни).</em></span></strong></div>
<div></div>
<div>
<p><strong>Тип двигател и мощност</strong></p>
<ul>
<li><strong>Тип:</strong> Едноцилиндров, 4-тактов, SOHC.</li>
<li><strong>Работен обем:</strong> 400 куб. см.</li>
<li><strong>Максимална мощност:</strong> 23 kW &#8211; 28 Hp при 7000 об./мин..</li>
<li><strong>Максимален въртящ момент:</strong> 32 Nm при 6000 об./мин..</li>
<li><strong>Горивна система:</strong> Електронно впръскване на горивото (EFI) с електронна дроселна клапа.</li>
<li><strong>Степен на сгъстяване:</strong> 10,39 : 1.</li>
<li><strong>Максимална скорост:</strong> 60 км/ч.</li>
<li><strong>Стартер:</strong> Електрически.</li>
<li><strong>Категория на превозното средство:</strong> T3b.</li>
</ul>
<p><strong>Трансмисия и задвижване</strong></p>
<ul>
<li><strong>Скоростна кутия: </strong>Автоматична CVT (L-H-N-R-P).</li>
<li><strong>Задвижваща система:</strong> 4WD (задвижване на четирите колела).</li>
<li><strong>Блокировка на диференциала:</strong> Предна блокировка на диференциала (без блокировка отзад).</li>
<li><strong>Задвижване:</strong> Чрез вал.</li>
</ul>
<p><strong>Окачване и спирачна система</strong></p>
<ul>
<li><strong>Предно окачване:</strong> Независимо с двойни А-рамена.</li>
<li><strong>Задно окачване:</strong> Независимо с двойни А-рамена.</li>
<li><strong>Амортисьори:</strong> Хидравлични амортисьори (предни и задни).</li>
<li><strong>Спирачна система:</strong> Предни и задни вентилирани дискови спирачки.</li>
<li><strong>Предни гуми:</strong> AT 24&#215;8-12.</li>
<li><strong>Задни гуми:</strong> AT 24&#215;10-12.</li>
<li><strong>Джанти:</strong> Алуминиеви.</li>
</ul>
<p><strong>Размери и капацитет</strong></p>
<ul>
<li><strong>Размери (Д х Ш х В):</strong> 2200 мм x 1200 мм x 1450 мм.</li>
<li><strong>Междуосие:</strong> 1330 мм.</li>
<li><strong>Просвет (клиренс):</strong> 275 мм.</li>
<li><strong>Собствено тегло:</strong> 448 кг.</li>
<li><strong>Капацитет на резервоара:</strong> 18 литра.</li>
<li><strong>Дълбочина на газене:</strong> 510–560 мм.</li>
<li><strong>Капацитет на местата:</strong> 2 души.</li>
</ul>
<p><strong>Акценти и стандартно оборудване</strong></p>
<ul>
<li><strong>Потребителски интерфейс:</strong> Модерен и стилен 7-инчов LCD дисплей, който ясно показва цялата важна информация.</li>
<li><strong>LED осветление:</strong> Пълни LED светлини за силно осветяване и изискана визия.</li>
<li><strong>Ергономичност:</strong> Ергономичен дизайн на превключвателите на кормилото за максимален комфорт.</li>
<li><strong>Лесна поддръжка:</strong> Бърз достъп до капака за обслужване на двигателя.</li>
<li><strong>Оборудване: </strong>Теглич, защита на долната част на корпуса, протектори за ръцете и здрави багажници.</li>
<li><strong>Гориво:</strong> Безоловен бензин.</li>
</ul>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1;"></div>
<div></div>
</div>
<div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=770%2C801%2C1088%2C1099%2C1096&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996083"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div><div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >продължите.** Телефон преди</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=770,801,1088,1099,1096&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>
</div>`,
  },
  {
    name: "ATV Hisun Guardian 750",
    slug: "atv-hisun-guardian-750",
    category: "ATV",
    brand: "Hisun",
    year: 2026,
    horsepower: "44 к.с.",
    engine: "Едноцилиндров 4-такт SOHC, 750 cc, EFI",
    weight: "448 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/atv-hisun-guardian-750-1.png\",\"/images/products/atv-hisun-guardian-750-2.png\",\"/images/products/atv-hisun-guardian-750-3.png\",\"/images/products/atv-hisun-guardian-750-4.png\"]",
    description: `<h3>ATV</h3>
<h1>ATV <strong>Hisun Guardian 750</strong><br />
<strong>(облегалка, протектори за ръцете, жироскоп, отопление и въздушно окачване)</strong></h1>
<p>Hisun Guardian 750 е ултрамодерният и многофункционален помощник за взискателни приложения.<br />
Със своя мощен 750-кубиков двигател и 4х4 задвижване на всички колела, той преодолява дори най-трудните условия — на строителната площадка, извън пътя или при офроуд приключения.<br />
Това класическо ATV съчетава висок капацитет на теглене, впечатляващ полезен товар и ергономичен дизайн, превръщайки го в перфектния избор за всяко предизвикателство.</p>
<div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
<div><strong><span style="color: #ff0000;"><em>⚠ ВАЖНО: Наличен цвят: Горски камуфлаж . (Снимките в други цветове са само илюстративни).</em></span></strong></div>
<div></div>
<div>
<p><strong>Тип двигател и мощност</strong></p>
<ul>
<li><strong>Тип:</strong> Едноцилиндров, 4-тактов, SOHC.</li>
<li><strong>Работен обем:</strong> 750 куб. см.</li>
<li><strong>Максимална мощност:</strong> 32 kW – 44Hp при 6000 об./мин.</li>
<li><strong>Максимален въртящ момент:</strong> 54 Nm при 5500 об./мин.</li>
<li><strong>Горивна система:</strong> Електронно впръскване на горивото (EFI) с електронна дроселна клапа.</li>
<li><strong>Степен на сгъстяване:</strong> 9,19 : 1.</li>
<li><strong>Максимална скорост:</strong> 60 км/ч.</li>
<li><strong>Стартер:</strong> Електрически.</li>
<li><strong>Категория на превозното средство:</strong> T3b.</li>
</ul>
<p><strong>Трансмисия и задвижване</strong></p>
<ul>
<li><strong>Скоростна кутия:</strong> Автоматична CVT (L-H-N-R-P).</li>
<li><strong>Задвижваща система:</strong> 4WD (задвижване на всички колела).</li>
<li><strong>Блокировка на диференциала:</strong> Предна и задна блокировка на диференциала.</li>
<li><strong>Задвижване:</strong> Чрез вал.</li>
</ul>
<p><strong>Окачване и спирачна система</strong></p>
<ul>
<li><strong>Предно окачване:</strong> Независимо с двойни А-рамена.</li>
<li><strong>Задно окачване:</strong> Независимо с двойни А-рамена.</li>
<li><strong>Амортисьори:</strong> Газови амортисьори (предни и задни).</li>
<li><strong>Спирачна система:</strong> Предни и задни вентилирани дискови спирачки.</li>
<li><strong>Предни гуми:</strong> AT 25&#215;8-12.</li>
<li><strong>Задни гуми:</strong> AT 25&#215;10-12.</li>
<li><strong>Джанти:</strong> Алуминиеви.</li>
</ul>
<p><strong>Размери и капацитет</strong></p>
<ul>
<li><strong>Размери (Д х Ш х В):</strong> 2200 мм x 1200 мм x 1450 мм.</li>
<li><strong>Междуосие:</strong> 1330 мм.</li>
<li><strong>Просвет (клиренс):</strong> 275 мм.</li>
<li><strong>Собствено тегло:</strong> 448 кг.</li>
<li><strong>Капацитет на резервоара:</strong> 18 литра.</li>
<li><strong>Дълбочина на газене:</strong> 510–560 мм.</li>
<li><strong>Капацитет на местата:</strong> 2 души.</li>
</ul>
<p><strong>Технологии и стандартно оборудване</strong></p>
<ul>
<li><strong>Цвят:</strong> Горски камуфлаж.</li>
<li><strong>Потребителски интерфейс:</strong> Модерен 7-инчов TFT цветен дисплей.</li>
<li><strong>Система без ключ:</strong> Стартиране без ключ и прецизен скоростен лост за максимално удобство.</li>
<li><strong>LED осветление:</strong> Пълни и мощни LED светлини за отлична видимост и изискана визия.</li>
<li><strong>Сервоусилвател (EPS):</strong> Електронно серво управление за лекота при маневриране.</li>
<li><strong>Лебедка:</strong> Капацитет 2500 lbs (1130 кг).</li>
<li><strong>Комфорт:</strong> Облегалка за пътника, отопление и въздушно окачване.</li>
<li><strong>Защита:</strong> Предпазители за ръцете на кормилото и пълна защита на долната част на корпуса.</li>
<li><strong>Багажници:</strong> Преден и заден багажник, изработени от висококачествена пластмаса.</li>
</ul>
<p><strong>Допълнителни екстри:</strong> Теглич, жироскоп и цветен пакет.</p>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div></div>
</div>
<div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=770%2C801%2C1088%2C1099%2C1096&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996083"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container">		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >Относно Email Телефон</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div><div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=770,801,1088,1099,1096&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>
</div>`,
  },
  {
    name: "ATV Hisun Guardian 750L",
    slug: "atv-hisun-guardian-750l",
    category: "ATV",
    brand: "Hisun",
    year: 2026,
    horsepower: "44 к.с.",
    engine: "Едноцилиндров 4-такт SOHC, 750 cc, EFI",
    weight: "452 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/atv-hisun-guardian-750l-1.png\"]",
    description: `<h3>ATV</h3>
<h1><strong>Hisun </strong>Guardian 750L<br />
(сензор за налягане в гумите)</h1>
<p>Hisun Guardian 750L е Вашият надежден партньор за всяка мисия — от работа в селското и горското стопанство до професионални офроуд преходи.<br />
Макар да е проектиран със силата на работна машина, той предлага функционалността, комфорта и сигурността на модерен вседеход.<br />
Това е класическо ATV с удължена база, което благодарение на своя мощен 750-кубиков двигател, задвижване на всички колела и блокировка на диференциалите, е готово да се справи с всеки терен без компромиси.</p>
<div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
<div><strong><span style="color: #ff0000;"><em>⚠ ВАЖНО: Наличен цвят: ВОЕННО ЗЕЛЕНО. (Снимките в други цветове са само илюстративни).</em></span></strong></div>
<div></div>
<div>
<p><strong>Тип двигател и мощност</strong></p>
<ul>
<li><strong>Тип:</strong> Едноцилиндров, 4-тактов, SOHC.</li>
<li><strong>Работен обем:</strong> 750 куб. см.</li>
<li><strong>Максимална мощност:</strong> 32 kW – 44Hp при 6000 об./мин..</li>
<li><strong>Максимален въртящ момент:</strong> 54 Nm при 5500 об./мин..</li>
<li><strong>Горивна система:</strong> Електронно впръскване на горивото (EFI) с електронна дроселна клапа.</li>
<li><strong>Степен на сгъстяване:</strong> 9,19 : 1.</li>
<li><strong>Максимална скорост:</strong> 60 км/ч.</li>
<li><strong>Стартер:</strong> Електрически.</li>
<li><strong>Категория на превозното средство:</strong> T3b.</li>
</ul>
<p><strong>Трансмисия и задвижване</strong></p>
<ul>
<li><strong>Скоростна кутия:</strong> Автоматична CVT (L-H-N-R-P).</li>
<li><strong>Задвижваща система:</strong> 2WD / 4WD.</li>
<li><strong>Блокировка на диференциала:</strong> Предна и задна блокировка на диференциала.</li>
<li><strong>Задвижване:</strong> Чрез вал.</li>
</ul>
<p><strong>Окачване и спирачна система</strong></p>
<ul>
<li><strong>Предно окачване:</strong> Независимо с двойни А-рамена.</li>
<li><strong>Задно окачване:</strong> Независимо с двойни А-рамена.</li>
<li><strong>Амортисьори:</strong> Газови амортисьори (предни и задни).</li>
<li><strong>Спирачна система:</strong> Предни и задни вентилирани дискови спирачки.</li>
<li><strong>Предни гуми:</strong> AT 26&#215;9-14 Radial.</li>
<li><strong>Задни гуми:</strong> AT 26&#215;11-14 Radial.</li>
<li><strong>Джанти:</strong> Алуминиеви.</li>
</ul>
<p><strong>Размери и капацитет</strong></p>
<ul>
<li><strong>Размери (Д х Ш х В):</strong> 2360 мм x 1200 мм x 1450 мм.</li>
<li><strong>Междуосие:</strong> 1490 мм.</li>
<li><strong>Просвет (клиренс):</strong> 275 мм.</li>
<li><strong>Собствено тегло:</strong> 452 кг.</li>
<li><strong>Капацитет на резервоара:</strong> 18 литра.</li>
<li><strong>Дълбочина на газене:</strong> 510–560 мм.</li>
<li><strong>Капацитет на местата:</strong> 2 души.</li>
</ul>
<p><strong>Технологии и стандартно оборудване</strong></p>
<ul>
<li><strong>Цвят:</strong> Военно зелено.</li>
<li><strong>Сензор за налягане в гумите:</strong> Добавена система за постоянен мониторинг и сигурност.</li>
<li><strong>Потребителски интерфейс:</strong> Модерен 7-инчов TFT цветен дисплей.</li>
<li><strong>Система без ключ:</strong> Стартиране без ключ и прецизен скоростен лост за максимално удобство.</li>
<li><strong>LED осветление:</strong> Пълни и мощни LED светлини за отлична видимост.</li>
<li><strong>Сервоусилвател (EPS):</strong> Електронно серво управление за лекота при маневриране.</li>
<li><strong>Лебедка:</strong> Капацитет 2500 lbs (1130 кг).</li>
<li><strong>Комфорт:</strong> Облегалка за пътника, отопление и въздушно окачване.</li>
<li><strong>Защита:</strong> Предпазители за ръцете на кормилото и пълна защита на долната част на корпуса.</li>
<li><strong>Багажници:</strong> Преден и заден багажник, изработени от висококачествена пластмаса.</li>
<li><strong>Допълнителни екстри:</strong> Теглич, жироскоп и цветен пакет.</li>
</ul>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div style="flex: 1;"></div>
<div></div>
</div>
<div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=770%2C801%2C1088%2C1099%2C1096&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996083"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container">		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >Вашето отбележете, съобщение</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div><div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=770,801,1088,1099,1096&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>
</div>`,
  },
  {
    name: "ATV Linhai F320",
    slug: "atv-linhai-f320",
    category: "ATV",
    brand: "Linhai",
    year: 2026,
    horsepower: "21 к.с.",
    engine: "LH173MN едноцилиндров 4-такт водоохлаждан, 275 cc",
    weight: "295 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/atv-linhai-f320-1.png\",\"/images/products/atv-linhai-f320-2.png\"]",
    description: `<h3>ATV</h3>
<h1>Linhai F320<br />
<strong>/Алуминиеви джанти, Лебедка, Теглич, Облегалка/</strong></h1>
<p>Linhai F320 е перфектният баланс между мощност и практичност. Проектиран като многофункционален модел, той предлага модерна визия и функционалности, които обикновено се срещат при по-високия клас машини. Моделът е идеален партньор за работа в стопанството, лов, риболов или вълнуващи офроуд разходки по пресечен терен.</p>
<div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
<div><strong><span style="color: #ff0000;"><em>⚠ ВАЖНО: Наличен цвят: СИВ. (Снимките в други цветове са само илюстративни).</em></span></strong></div>
<div></div>
<div>
<p><strong>Основни акценти и технологии:</strong></p>
<ul>
<li><strong>Модерен LCD дисплей: </strong>Изцяло дигитално табло с висока резолюция, което предоставя цялата необходима информация (скорост, обороти, часове) по ясен и лесен за четене начин.</li>
<li><strong>Отопляеми ръкохватки: </strong>Три степени на подгрев.</li>
<li><strong>Интегрирана LED осветителна система: </strong>Предни фарове „всичко в едно“ (къси, дълги, мигачи) и впечатляваща задна LED лента за максимална видимост и модерна визия.</li>
<li><strong>Интелигентен дизайн за поддръжка: </strong>Страничните панели на двигателя са проектирани за лесен достъп, което позволява бърза проверка на маслото и обслужване без инструменти.</li>
<li><strong>Пълен офроуд пакет: </strong>Фабрично оборудван с лебедка, теглич, алуминиеви джанти и здрави багажници за пренос на товари.</li>
<li><strong>Комфорт за двама: </strong>Ергономична седалка с включена удобна облегалка за пътника, осигуряваща стабилност при преходи.</li>
<li><strong>Надеждна трансмисия: </strong>Оптимизиран скоростен лост за лесно и плавно превключване между бързи (H), бавни (L), неутрална (N) и задна (R) предавка.</li>
</ul>
<p><strong>Подробни технически характеристики:</strong></p>
<ul>
<li><strong>Двигател: </strong>Модел LH173MN, едноцилиндров, 4-тактов с водно охлаждане.</li>
<li><strong>Работен обем: </strong>275 куб. см.</li>
<li><strong>Максимална мощност: </strong>16 kW / 21.4 к.с. (при 6500-7000 об/мин).</li>
<li><strong>Максимален въртящ момент: </strong>23 Nm при 5500 об/мин.</li>
<li><strong>Задвижване: </strong>Избираемо 2WD / 4WD според нуждите на терена.</li>
<li><strong>Максимална скорост: </strong>60 км/ч.</li>
<li><strong>Спирачна система: </strong>Мощни хидравлични дискови спирачки на предните и задните колела.</li>
<li><strong>Окачване: </strong>Независимо предно окачване тип McPherson за максимален комфорт.</li>
<li><strong>Размери (ДхШхВ): </strong>2120 x 1140 x 1270 мм.</li>
<li><strong>Собствено тегло: </strong>295 кг.</li>
<li><strong>Резервоар: </strong>14 литра.</li>
<li><strong>Цвят: </strong>Сив</li>
</ul>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div></div>
</div>
<div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=1028%2C1105%2C1112%2C1115%2C1054&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996084"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >Моля, име за</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=1028,1105,1112,1115,1054&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>
</div>`,
  },
  {
    name: "ATV Linhai M210",
    slug: "atv-linhai-m210",
    category: "ATV",
    brand: "Linhai",
    year: 2026,
    horsepower: "11 к.с.",
    engine: "LH1P63FMK-2 едноцилиндров 4-такт въздушноохлаждан, 177 cc",
    weight: "188 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/atv-linhai-m210-1.png\",\"/images/products/atv-linhai-m210-2.png\",\"/images/products/atv-linhai-m210-3.png\",\"/images/products/atv-linhai-m210-4.png\",\"/images/products/atv-linhai-m210-5.png\"]",
    description: `<h3>ATV</h3>
<h1><strong>Linhai M210 </strong><br />
<strong>/Алуминиеви джанти, Теглич/</strong></h1>
<p><strong>Linhai M210 е идеалното ATV за начинаещи и любители на офроуд разходките. Неговият лек и маневрен дизайн позволява максимален контрол при управление, докато надеждният двигател осигурява пъргаво представяне както на полски пътища, така и при пресечен терен. С M210 изживявате истинско офроуд удоволствие в компактен формат.</strong></p>
<div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
<div><strong><span style="color: #ff0000;"><em>⚠ ВАЖНО: Наличен цвят: Червен. (Снимките в други цветове са само илюстративни).</em></span></strong></div>
<div></div>
<div>
<p><strong>Основни акценти и технологии:</strong></p>
<ul>
<li><strong>Ефективен двигател с EFI: </strong>Оборудван с модерен 177-кубиков двигател с инжекционна система (EFI), която гарантира по-добра реакция и икономичност.</li>
<li><strong>Лекота и маневреност: </strong>Със собствено тегло от едва 188.5 кг, машината е изключително лесна за управление и подходяща за всеки тип водач.</li>
<li><strong>LED светлинна икона: </strong>Дизайнът включва модерни предни светлини и LED детайли, които придават на M210 агресивен и съвременен вид.</li>
<li><strong>Пълен комфорт за пътника: </strong>Фабрично монтирана удобна облегалка, която осигурява сигурност и удобство при по-дълги преходи.</li>
<li><strong>Интуитивна трансмисия:</strong> Автоматична скоростна кутия с лесен за използване лост за превключване между предна, неутрална, задна и паркинг позиция (L-H-N-R-P).</li>
<li><strong>Готов за работа: </strong>Оборудван с преден и заден багажник, както и с теглич за прикачване на ремарке.</li>
</ul>
<p><strong>Подробни технически характеристики:</strong></p>
<ul>
<li><strong>Двигател: </strong>Модел LH1P63FMK-2, едноцилиндров, 4-тактов с въздушно охлаждане.</li>
<li><strong>Работен обем: </strong>177.3 куб. см.</li>
<li><strong>Максимална мощност: </strong>8.4 kW / 11.26 к.с. (при 7500 об/мин).</li>
<li><strong>Максимален въртящ момент: </strong>12.5 Nm (при 5500 об/мин).</li>
<li><strong>Максимална скорост: </strong>60 км/ч.</li>
<li><strong>Задвижване: </strong>Верига.</li>
<li><strong>Спирачки: </strong>Хидравлични дискови спирачки на предните и задните колела.</li>
<li><strong>Окачване (предно): </strong>Независимо окачване с двойни А-образни рамена.</li>
<li><strong>Гуми: </strong>Предни AT21x7-10, задни AT22x10-10.</li>
<li><strong>Размери (ДхШхВ): </strong>1905 x 1048 x 1150 мм.</li>
<li><strong>Пътен просвет (клиренс): </strong>140 мм.</li>
<li><strong>Резервоар: </strong>8.35 литра.</li>
<li><strong>Хомологация: </strong>CE / T3a / T3b (възможност за регистрация за движение по пътищата).</li>
<li><strong>Цвят: </strong>Наситено червено.</li>
</ul>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;"></div>
</div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div></div>
</div>
<div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=1028%2C1105%2C1112%2C1115%2C1054&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996084"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div><div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >Вашето за Относно</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=1028,1105,1112,1115,1054&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>
</div>`,
  },
  {
    name: "ATV Linhai Promax 550",
    slug: "atv-linhai-promax-550",
    category: "ATV",
    brand: "Linhai",
    year: 2026,
    horsepower: "39 к.с.",
    engine: "Едноцилиндров 4-такт SOHC водоохлаждан, 499.5 cc, EFI",
    weight: "371 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/atv-linhai-promax-550-1.png\"]",
    description: `<h3>ATV</h3>
<h1>Linhai Promax 550</h1>
<p><strong>Linhai Promax 550 е ATV, създадено за онези, които търсят скорост, приключения и безкомпромисна проходимост. С агресивния си нов дизайн и подобрена мощност, този модел предлага изключително изживяване както при работа в тежки условия, так и при динамично офроуд шофиране.</strong></p>
<div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
<div><strong><span style="color: #ff0000;"><em>⚠ ВАЖНО: Наличен цвят: Черен. (Снимките в други цветове са само илюстративни).</em></span></strong></div>
<div></div>
<div>
<p><strong>Основни акценти и технологии:</strong></p>
<ul>
<li><strong>EPS (Електрическо серво управление): </strong>Системата за серво управление (EPS) значително улеснява маневрирането, като осигурява прецизен контрол и лекота на волана при всякаква скорост и терен.</li>
<li><strong>Мощен двигател с EFI: </strong>Обновеният 500-кубиков двигател с електронно впръскване на горивото (EFI) предлага с 18.7% по-висока мощност спрямо предходните модели, достигайки 38.8 к.с.</li>
<li><strong>Матрични Full-LED светлини: </strong>Високопроизводителни матрични LED фарове с дневни светлини и динамични мигачи за отлична видимост и модерен „Promax“ стил.</li>
<li><strong>Пълен офроуд пакет: </strong>Фабрично оборудван с надеждна електрическа лебедка с голяма теглителна сила, теглич и олекотени алуминиеви джанти с маркови офроуд гуми.</li>
<li><strong>Интелигентно 4х4 задвижване: </strong>Електрически превключваемо 2WD/4WD задвижване с блокаж на предния диференциал, което гарантира сцепление дори в най-дълбоката кал.</li>
<li><strong>Комфорт за двама: </strong>Дизайнът включва удобна седалка с включена облегалка за пътника, предпазители за ръцете и здрави багажници за пренос на багаж.</li>
</ul>
<p><strong>Подробни технически характеристики:</strong></p>
<ul>
<li><strong>Двигател: </strong>Едноцилиндров, 4-тактов, SOHC с водно охлаждане.</li>
<li><strong>Работен обем: </strong>499.5 куб. см.</li>
<li><strong>Максимална мощност: </strong>28.5 kW / 38.8 к.с. (при 6800 об/мин).</li>
<li><strong>Максимален въртящ момент:</strong> 46.5 Nm при 5750 об/мин.</li>
<li><strong>Трансмисия: </strong>Автоматична CVTech (Канада) с предавки P-H-L-N-R.</li>
<li><strong>Задвижване: </strong>2WD/4WD с електрически блокиращ преден диференциал.</li>
<li><strong>Спирачна система: </strong>Хидравлични дискови спирачки на предните и задните колела.</li>
<li><strong>Окачване: </strong>Предно независимо тип McPherson и задно независимо с двойни А-образни рамена.</li>
<li><strong>Гуми: </strong>Предни AT25x8-12, задни AT25x10-12.</li>
<li><strong>Размери (ДхШхВ): </strong>2120 x 1185 x 1270 мм.</li>
<li><strong>Собствено тегло: </strong>371 кг.</li>
<li><strong>Капацитет на резервоара: </strong>12.5 литра.</li>
<li><strong>Хомологация: </strong>T3b (възможност за регистрация за движение по пътищата с категория B).</li>
<li><strong>Цвят: </strong>Черен.</li>
</ul>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div></div>
</div>
<div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=1028%2C1105%2C1112%2C1115%2C1054&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996084"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div><div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >контакт за Email</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=1028,1105,1112,1115,1054&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>
</div>`,
  },
  {
    name: "ATV Linhai Promax 650L",
    slug: "atv-linhai-promax-650l",
    category: "ATV",
    brand: "Linhai",
    year: 2026,
    horsepower: "39 к.с.",
    engine: "Едноцилиндров 4-такт водоохлаждан, 585.3 cc, EFI",
    weight: "395 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/atv-linhai-promax-650l-1.png\"]",
    description: `<h3>ATV</h3>
<h1><strong>ATV Linhai Promax 650L </strong></h1>
<p><strong>Linhai Promax 650L е флагманът на серията PROMAX, разработен за най-високи изисквания и професионална употреба. Това е мощно </strong><strong>АТВ,</strong><strong> което съчетава върхова проходимост с удължено шаси за максимална стабилност и комфорт при всякакви условия. Благодарение на здравата си конструкция и високия просвет, 650L е напълно подготвен за екстремни офроуд предизвикателства.</strong></p>
<div>
<div style="flex: 1; max-width: 50%;"></div>
</div>
<div><strong><span style="color: #ff0000;"><em>⚠ ВАЖНО: Наличен цвят: Черен. (Снимките в други цветове са само илюстративни).</em></span></strong></div>
<div></div>
<div>
<p><strong>Основни акценти и технологии:</strong></p>
<ul>
<li><strong>Върхова мощност: </strong>Оборудван с мощен 585.3 куб. см двигател, който осигурява максимална тяга и отлична производителност.</li>
<li><strong>EPS (Електронно серво управление): </strong>Системата за серво управление гарантира лекота при маневриране и прецизен контрол, намалявайки умората на водача.</li>
<li><strong>Максимално сцепление: </strong>Задвижването на всички колела с блокировка на диференциала гарантира оптимално преминаване през кал, пясък и стръмни терени.</li>
<li><strong>Удължена база: </strong>По-дългото междуосие осигурява допълнително пространство и по-висока стабилност при превоз на двама души.</li>
<li><strong>Готов за работа: </strong>Фабрично оборудван с мощна лебедка, теглич и здрави багажници за пренос на товари.</li>
<li><strong>Безопасност и комфорт: </strong>Оборудван с хидравлични дискови спирачки на всички колела и удобна облегалка за пътника.</li>
</ul>
<p><strong>Подробни технически характеристики:</strong></p>
<ul>
<li style="list-style-type: none;">
<ul>
<li style="list-style-type: none;">
<ul>
<li><strong>Двигател: </strong>Модел LH191MS, едноцилиндров, 4-тактов с водно охлаждане.</li>
<li><strong>Работен обем:</strong> 585.3 куб. см.</li>
<li><strong>Максимална мощност: </strong>38,8 к.с. (при 6800 об/мин).</li>
<li><strong>Максимален въртящ момент: </strong>49.5 Nm (при 5400 об/мин).</li>
<li><strong>Максимална скорост:</strong> 60 км/ч.</li>
<li><strong>Задвижване: </strong>Избираемо 2WD / 4WD.</li>
<li><strong>Трансмисия: </strong>Автоматична скоростна кутия (P-H-L-N-R).</li>
<li><strong>Спирачки: </strong>Предни и задни хидравлични дискови спирачки.</li>
<li><strong>Окачване: </strong>Независимо окачване с двойни А-образни рамена (отпред и отзад).</li>
<li><strong>Размери (ДхШхВ): </strong>2395 x 1305 x 1330 мм.</li>
<li><strong>Собствено тегло: </strong>395 кг.</li>
<li><strong>Пътен просвет (клиренс): </strong>270 мм.</li>
<li><strong>Резервоар: </strong>20 литра.</li>
<li><strong>Цвят: </strong>Класически черен.</li>
</ul>
</li>
</ul>
</li>
</ul>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div></div>
</div>
<div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=1028%2C1105%2C1112%2C1115%2C1054&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996084"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div><div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >Вашето контакт за</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=1028,1105,1112,1115,1054&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>
</div>`,
  },
  {
    name: "UTV Hisun Strike 250",
    slug: "utv-hisun-strike-250",
    category: "UTV",
    brand: "Hisun",
    year: 2026,
    horsepower: "16 к.с.",
    engine: "Едноцилиндров 4-такт SOHC, 229 cc, EFI",
    weight: "402 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/utv-hisun-strike-250-1.png\"]",
    description: `<h3>UTV</h3>
<h1>Hisun Strike 250</h1>
<p>Hisun Strike 250 е идеалният спортен Side-by-Side (UTV), проектиран да предложи на по-младите ентусиасти и начинаещи водачи първия им истински досег с офроуд приключенията. Въпреки компактните си размери, тази машина не прави компромис с качеството и е оборудвана с функции, които обикновено се срещат при много по-големи модели.<br />
Това UTV се отличава със своя пъргав 229-кубиков двигател с електронно впръскване на горивото (EFI) и автоматична трансмисия с ниски и високи предавки (L/H), което го прави изключително лесно за управление. Strike 250 идва стандартно напълно оборудван за терена – с покрив, предно стъкло, врати и лебедка, осигурявайки максимална безопасност и комфорт още от първото качване.</p>
<p>&nbsp;</p>
<div><span style="color: #ff0000;"><strong><em>⚠ ВАЖНО: Наличен цвят: СИН. (Снимките в други цветове са само илюстративни).</em></strong></span></div>
<div></div>
<div>
<p><strong>Тип двигател и мощност</strong><br />
• <strong>Тип:</strong> Едноцилиндров, 4-тактов, SOHC, 2-клапана.<br />
• <strong>Работен обем:</strong> 229 куб. см.<br />
• <strong>Диаметър х Ход на буталото:</strong> 65,5 мм x 68 мм.<br />
•<strong> Степен на сгъстяване:</strong> 9,5 : 1.<br />
• <strong>Максимална мощност:</strong> 12 kW (16,32 к.с.) при 7500 об./мин.<br />
•<strong> Максимален въртящ момент:</strong> 18,5 Nm при 5000 об./мин.<br />
• <strong>Горивна система:</strong> EFI (електронно впръскване на горивото).<br />
• <strong>Максимална скорост:</strong> 60 км/ч.<br />
• <strong>Стартер:</strong> Електрически.<br />
• <strong>Категория на превозното средство:</strong> T3b.</p>
<p><strong>Трансмисия и задвижване</strong><br />
• <strong>Скоростна кутия:</strong> CVT L-H-N-R.<br />
• <strong>Задвижваща система:</strong> 2WD.<br />
• <strong>Задвижване:</strong> Верига.</p>
<p><strong>Окачване и спирачна система</strong><br />
•<strong> Предно окачване:</strong> Независими двойни А-рамена.<br />
• <strong>Задно окачване:</strong> Люлеещо се рамо (Schwenkarm).<br />
• <strong>Спирачна система:</strong> Хидравлична дискова спирачка.<br />
• <strong>Предни гуми:</strong> AT 22&#215;7-10 Radial.<br />
•<strong> Задни гуми:</strong> AT 22&#215;10-10 Radial.</p>
<p><strong>Размери и капацитет</strong><br />
• <strong>Размери (Д х Ш х В):</strong> 2325 мм x 1260 мм x 1500 мм.<br />
• <strong>Минимален радиус на завиване:</strong> 3500 мм.<br />
• <strong>Междуосие:</strong> 1733 мм.<br />
• <strong>Просвет (клиренс):</strong> 206 мм.<br />
• <strong>Собствено тегло:</strong> 402 кг.<br />
• <strong>Полезен товар:</strong> 125 кг.<br />
• <strong>Товарна площ:</strong> 508 x 940 x 178 мм.<br />
• <strong>Капацитет на резервоара:</strong> 13 литра.<br />
• <strong>Капацитет на теглене (без спирачки):</strong> 200 кг.<br />
• <strong>Вертикално натоварване на теглича:</strong> 29 кг.</p>
<p><strong>Допълнителни екстри и оборудване</strong><br />
•<strong> Гориво:</strong> Безоловен бензин.<br />
• <strong>Оборудване:</strong> Включва стандартни врати.<br />
• <strong>Предназначение:</strong> Практичен помощник за всякаква работа около дома и двора, предлагащ забавление и качество.<br />
•<strong> Цвят:</strong> Син.<br />
• <strong>Защита:</strong> Покрив и поликарбонатно предно стъкло.</p>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;"></div>
</div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=1028%2C1105%2C1112%2C1115%2C1054&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996084"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >продължите.** контакт Относно</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div><div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=1028,1105,1112,1115,1054&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>`,
  },
  {
    name: "UTV Hisun Sector 550",
    slug: "utv-hisun-sector-550",
    category: "UTV",
    brand: "Hisun",
    year: 2026,
    horsepower: "30 к.с.",
    engine: "Едноцилиндров 4-такт SOHC, 546 cc, EFI",
    weight: "743 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/utv-hisun-sector-550-1.png\",\"/images/products/utv-hisun-sector-550-2.jpg\",\"/images/products/utv-hisun-sector-550-3.jpg\",\"/images/products/utv-hisun-sector-550-4.jpg\",\"/images/products/utv-hisun-sector-550-5.jpg\",\"/images/products/utv-hisun-sector-550-6.jpg\",\"/images/products/utv-hisun-sector-550-7.jpg\",\"/images/products/utv-hisun-sector-550-8.jpg\",\"/images/products/utv-hisun-sector-550-9.jpg\"]",
    description: `<h3>UTV</h3>
<h1>Hisun Sector 550</h1>
<h1>(Оборудван с покрив, поликарбонатно предно стъкло и лебедка)</h1>
<p>Hisun Sector 550 не е обикновено АТВ, а мощно и многофункционално UTV, създадено за тези, които търсят комфорт и сигурност при работа или разходки сред природата.<br />
За разлика от стандартните АТВ-та, тук разполагате с удобна пълноразмерна седалка, защитна кабина, волан и голямо товарно леген за багаж. С включеното 4&#215;4 задвижване, лебедка и поликарбонатно предно стъкло, тази машина е готова да премине през всеки терен, като ви предпазва от вятър и дъжд.</p>
<p>&nbsp;</p>
<div><span style="color: #ff0000;"><strong><em>⚠ ВАЖНО: Наличен цвят: АВОКАДО (Снимките в други цветове са само илюстративни).</em></strong></span></div>
<div></div>
<div>
<p><strong>Тип двигател и мощност</strong><br />
•<strong> Тип:</strong> Едноцилиндров, 4-тактов, SOHC, 2-клапана.<br />
•<strong> Работен обем:</strong> 546 куб. см.<br />
• <strong>Диаметър х Ход на буталото:</strong> 91 мм x 84 мм.<br />
• <strong>Степен на сгъстяване:</strong> 9,5 : 1.<br />
• <strong>Максимална мощност:</strong> 22 kW (29,92 к.с.) при 6000 об./мин..<br />
• <strong>Максимален въртящ момент:</strong> 40 Nm при 5000 об./мин..<br />
• <strong>Горивна система:</strong> EFI (електронно впръскване на горивото).<br />
• <strong>Максимална скорост:</strong> 60 км/ч.<br />
• <strong>Стартер:</strong> Електрически.<br />
• <strong>Капацитет на резервоара:</strong> 28 литра.<br />
• <strong>Категория на превозното средство:</strong> T1b.</p>
<p><strong>Трансмисия и задвижване</strong><br />
•<strong> Скоростна кутия:</strong> CVT L-H-N-R.<br />
• <strong>Задвижваща система:</strong> 4WD.<br />
• <strong>Блокировка на диференциала:</strong> Със заключващ диференциал.<br />
• <strong>Задвижване:</strong> Чрез вал.</p>
<p><strong>Окачване и спирачна система</strong><br />
• <strong>Предно окачване:</strong> Независими двойни А-рамена.<br />
• <strong>Задно окачване:</strong> Независими двойни А-рамена.<br />
• <strong>Амортисьори:</strong> С азотно подпомагане.<br />
• <strong>Спирачна система:</strong> Четворно вентилирана хидравлична дискова спирачка.<br />
• <strong>Предни гуми:</strong> AT 26&#215;9-14 Radial.<br />
• <strong>Задни гуми:</strong> AT 26&#215;11-14 Radial.</p>
<p><strong>Размери и капацитет</strong><br />
• <strong>Размери (Д х Ш х В):</strong> 2980 мм x 1550 мм x 1950 мм.<br />
• <strong>Междуосие:</strong> 1950 мм.<br />
• <strong>Просвет:</strong> 310 мм.<br />
• <strong>Собствено тегло:</strong> 743 кг.<br />
• <strong>Полезен товар:</strong> 225 кг.<br />
•<strong> Товарна площ:</strong> 863 x 1143 x 280 мм.<br />
•<strong> Капацитет на теглене:</strong> 350 кг.<br />
• <strong>Вертикално натоварване на теглича:</strong> 43 кг.</p>
<p><strong>Допълнителни екстри и оборудване</strong><br />
• <strong>Цвят:</strong> Зелено авокадо.<br />
• <strong>Защита:</strong> Покрив и поликарбонатно предно стъкло.<br />
• <strong>Лебедка:</strong> Капацитет 1680 кг.<br />
• <strong>Стандартно оборудване:</strong> Сервоусилвател на волана, алуминиеви джанти, въздушно окачване, теглич и подглавници.<br />
• <strong>Гориво:</strong> Безоловен бензин.</p>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;"></div>
</div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=1075%2C1118%2C1122%2C1125&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996084"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >Относно продължите.** контакт</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=1075,1118,1122,1125&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>`,
  },
  {
    name: "UTV Linhai T-Boss 570",
    slug: "utv-linhai-tboss-570",
    category: "UTV",
    brand: "Linhai",
    year: 2026,
    horsepower: "38 к.с.",
    engine: "4-такт течноохлаждан, 499.5 cc, EFI",
    weight: "540 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/utv-linhai-tboss-570-1.png\"]",
    description: `<h3>UTV</h3>
<h1>UTV Linhai T-Boss 570</h1>
<p><strong>Linhai T-Boss 570 е мощно UTV, проектирано да бъде вашият силен партньор както за професионална работа, така и за свободното време. Със своята здрава конструкция, товарна площ и надеждно задвижване на всички колела, този модел е идеалният избор за стопанства, ловни територии или офроуд експедиции. Без значение дали се движите в двора или по труден терен, T-Boss 570 гарантира сигурност и безотказна работа при всякакви условия.</strong></p>
<p>&nbsp;</p>
<div><span style="color: #ff0000;"><strong><em>⚠ ВАЖНО: Наличен цвят: горско зелено (Снимките в други цветове са само илюстративни).</em></strong></span></div>
<div></div>
<div>
<p><strong>Основни акценти и технологии</strong></p>
<ul>
<li><strong>Висока производителност: </strong>Оборудван с надежден 499.5 куб. см едноцилиндров, 4-тактов двигател с течно охлаждане, осигуряващ стабилна мощност от 38.2 к.с.</li>
<li><strong>EPS (Електронно серво управление): </strong>Системата за серво управление  прави маневрирането изключително леко и прецизно, намалявайки умората при работа.</li>
<li><strong>CVTech трансмисия: </strong>Качествена автоматична скоростна кутия от канадския лидер CVTech за плавно предаване на мощността.</li>
<li><strong>Защита и функционалност: </strong>Включва предно стъкло за защита от вятър и прах, както и самосвален товарен отсек  за лесно разтоварване.</li>
<li><strong>Пълен офроуд пакет: </strong>Фабрично монтирана лебедка , теглич и здрава защитна клетка за максимална сигурност и помощ при работа.</li>
<li><strong>Интелигентно задвижване: </strong>Избираема 2WD/4WD система, която позволява на машината да се справя с лекота с кал, пясък и стръмни терени.</li>
</ul>
<div>
<p><strong>Подробни технически характеристики:</strong></p>
<ul>
<li><strong>Двигател: </strong>Модел LH191MR-C, 4-тактов с течно охлаждане и EFI система.</li>
<li><strong>Работен обем: </strong>499.5 куб. см.</li>
<li><strong>Максимална мощност: </strong>28.5 kW / 38.2 к.с. (при 6700-6900 об/мин).</li>
<li><strong>Максимален въртящ момент: </strong>46.5 Nm (при 5750 об/мин).</li>
<li><strong>Максимална скорост: </strong>60 км/ч.</li>
<li><strong>Трансмисия: </strong>Автоматична L-H-N-R-P.</li>
<li><strong>Задвижване: </strong>Избираемо 2WD / 4WD.</li>
<li><strong>Спирачки: </strong>Хидравлични дискови на четирите колела.</li>
<li><strong>Размери (ДхШхВ): </strong>2790 x 1470 x 1920 мм.</li>
<li><strong>Собствено тегло: </strong>540 кг.</li>
<li><strong>Товароносимост: </strong>300 кг.</li>
<li><strong>Резервоар: </strong>26 литра.</li>
<li><strong>Хомологация: </strong>T1b (възможност за регистрация за движение по пътищата).</li>
<li><strong>Цвят: </strong>Горско зелено.</li>
</ul>
<div>
</div>
<div style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 20px;">
<div></div>
</div>
<p><strong> </strong></p>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;"></div>
</div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;"></div>
</div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=1075%2C1118%2C1122%2C1125&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996084"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >преди Вашето отбележете,</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=1075,1118,1122,1125&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>`,
  },
  {
    name: "UTV Linhai LH 1100 U-Diesel червен",
    slug: "utv-linhai-lh1100-diesel-red",
    category: "UTV",
    brand: "Linhai",
    year: 2026,
    horsepower: "25 к.с.",
    engine: "Kubota дизел, 3-цилиндров 4-такт, 1123 cc",
    weight: "882 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/utv-linhai-lh1100-diesel-red-1.png\"]",
    description: `<h3>UTV</h3>
<h1>Linhai LH 1100 U-Diesel червен</h1>
<p><strong>Linhai LH 1100 U-Diesel поставя нови стандарти за мощност, функционалност и издръжливост в класа на работните машини. Оборудван с легендарния японски дизелов двигател Kubota, този модел предлага изключителна горивна ефективност, огромна тяга и ниски експлоатационни разходи. Със своята здрава конструкция и интелигентно 4WD задвижване, той е идеалният партньор за най-взискателните задачи в селското стопанство, индустрията и горското стопанство.</strong></p>
<p>&nbsp;</p>
<div><span style="color: #ff0000;"><strong><em>⚠ ВАЖНО: Наличен цвят: червен (Снимките в други цветове са само илюстративни).</em></strong></span></div>
<div></div>
<div>
<p><strong>Основни акценти и технологии</strong></p>
</div>
<ul>
<li><strong>Японски дизелов двигател Kubota: </strong>Сърцето на машината е надежден 1123-кубиков дизелов агрегат, осигуряващ висок въртящ момент от 71.5 Nm и дълъг живот дори при екстремни натоварвания.</li>
<li><strong>Професионална товарна площ: </strong>Здравото задно легло с размери 1470 мм ширина и 1020 мм дължина е проектирано да побира стандартен европалет, което го прави незаменимо за логистични задачи.</li>
<li><strong>EPS (Електронно серво управление): </strong>Системата за серво управление  осигурява прецизен контрол и лекота при маневриране, независимо от терена или тежестта на товара.</li>
<li><strong>Максимална проходимост: </strong>Избираемото 2WD / 4WD задвижване позволява на машината да преодолява кал, сняг и стръмни наклони с максимална скорост до 50 км/ч.</li>
<li><strong>Модерен LCD дисплей: </strong>Интуитивно дигитално табло, което предоставя цялата необходима информация за състоянието на машината в реално време.</li>
</ul>
<div>
<div>
<p><strong>Технически характеристики:</strong></p>
<ul>
<li><strong>Двигател: </strong>Трицилиндров дизелов Kubota, 4-тактов с водно охлаждане.</li>
<li><strong>Работен обем: </strong>1123 куб. см.</li>
<li><strong>Максимална мощност: </strong>18.5 kW / 25.2 к.с. (при 3000 об/мин).</li>
<li><strong>Максимален въртящ момент: </strong>71.5 Nm (при 2200 об/мин).</li>
<li><strong>Трансмисия: </strong>Автоматична H-L-N-R скоростна кутия.</li>
<li><strong>Спирачки: </strong>Хидравлични дискови на четирите колела.</li>
<li><strong>Размери (ДхШхВ): </strong>3110 x 1543 x 1990 мм.</li>
<li><strong>Собствено тегло: </strong>882 кг.</li>
<li><strong>Резервоар:</strong> 32 литра.</li>
<li><strong>Хомологация: </strong>CE / T3a / T3b (възможност за регистрация за движение по пътищата).</li>
<li><strong>Цвят: </strong>Ярко червен.</li>
</ul>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;"></div>
</div>
</div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;"></div>
</div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=1075%2C1118%2C1122%2C1125&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996084"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >Вашето преди продължите.**</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=1075,1118,1122,1125&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>`,
  },
  {
    name: "UTV Linhai LH 1100 U-Diesel жълт",
    slug: "utv-linhai-lh1100-diesel-yellow",
    category: "UTV",
    brand: "Linhai",
    year: 2026,
    horsepower: "25 к.с.",
    engine: "Kubota дизел, 3-цилиндров 4-такт, 1123 cc",
    weight: "882 кг",
    price: null,
    featured: false,
    images: "[\"/images/products/utv-linhai-lh1100-diesel-yellow-1.png\"]",
    description: `<h3>UTV</h3>
<h1>Linhai LH 1100 U-Diesel &#8211; <strong>EPS, Предно стъкло, Лебедка, Теглич</strong></h1>
<p>&nbsp;</p>
<p><strong>Linhai LH 1100 U-Diesel е тежкотоварно UTV, което в жълт цвят осигурява максимална видимост при работа в индустриални зони, ферми или строителни обекти. Моделът съчетава мощта на трицилиндров японски дизелов двигател Kubota със здравината на професионално офроуд шаси, което го превръща в ненадминат „работен кон“ за най-трудните терени.</strong></p>
<p><span style="color: #ff0000;"><strong><em>⚠ ВАЖНО: Наличен цвят: жълт (Снимките в други цветове са само илюстративни).</em></strong></span></p>
<p><strong>Основни акценти и технологии:</strong></p>
<ul>
<li><strong>Японски дизелов двигател Kubota: </strong>1123-кубиков агрегат с течно охлаждане, осигуряващ висок въртящ момент от 71.5 Nm за теглене на тежки товари.</li>
<li><strong>EPS (Електронно серво управление): </strong>Системата гарантира леко и прецизно управление с волан, намалявайки умората на водача при дълги работни смени.</li>
<li><strong>Професионален товарен отсек: </strong>Широка задна платформа (1470 x 1020 мм), проектирана да побира стандартен европалет.</li>
<li><strong>Избираемо задвижване 4WD: </strong>Възможност за превключване между 2WD и 4WD за оптимално сцепление върху кал, сняг или пясък.</li>
<li><strong>Пълен пакет оборудване: </strong>Стандартно включва предно поликарбонатно стъкло, мощна лебедка, теглич и защитна клетка.</li>
</ul>
<p><strong>Подробни технически характеристики:</strong></p>
<ul>
<li><strong>Тип двигател: </strong>Kubota Diesel, 3-цилиндров, 4-тактов.</li>
<li><strong>Работен обем: </strong>1123 куб. см.</li>
<li><strong>Максимална мощност: </strong>18.5 kW / 25.2 к.с..</li>
<li><strong>Максимална скорост: </strong>50 км/ч.</li>
<li><strong>Трансмисия: </strong>Автоматична H-L-N-R скоростна кутия.</li>
<li><strong>Размери (ДхШхВ): </strong>3110 x 1543 x 1990 мм.</li>
<li><strong>Капацитет на резервоара: </strong>32 литра.</li>
<li><strong>Собствено тегло: </strong>882 кг.</li>
<li><strong>Цвят: </strong>Жълт</li>
</ul>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;"></div>
</div>
<div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
<div style="width: 30%; text-align: center;"></div>
</div>
</div>
<p>ЗАПИТВАНЕ ЗА ПРОДУКТ</p>
<table class="wp-list-table widefat fixed striped table-view-list forms">
<tbody id="the-list" data-wp-lists="list:form">
<tr>
<td class="shortcode column-shortcode" data-colname="Shortcode"><style id="wpforms-css-vars-562">
				#wpforms-562 {
				--wpforms-container-padding: 0px;
--wpforms-container-border-width: 1px;
--wpforms-container-border-radius: 3px;
--wpforms-background-color: rgba(0, 0, 0, 0);
--wpforms-field-size-input-height: 43px;
--wpforms-field-size-input-spacing: 15px;
--wpforms-field-size-font-size: 16px;
--wpforms-field-size-line-height: 19px;
--wpforms-field-size-padding-h: 14px;
--wpforms-field-size-checkbox-size: 16px;
--wpforms-field-size-sublabel-spacing: 5px;
--wpforms-field-size-icon-size: 1;
--wpforms-label-size-font-size: 16px;
--wpforms-label-size-line-height: 19px;
--wpforms-label-size-sublabel-font-size: 14px;
--wpforms-label-size-sublabel-line-height: 17px;
--wpforms-button-size-font-size: 17px;
--wpforms-button-size-height: 41px;
--wpforms-button-size-padding-h: 15px;
--wpforms-button-size-margin-top: 10px;
--wpforms-container-shadow-size-box-shadow: none;
			}
			</style><div class="wpforms-container wpforms-container-full wpforms-render-modern" id="wpforms-562"><form id="wpforms-form-562" class="wpforms-validate wpforms-form wpforms-ajax-form" data-formid="562" method="post" enctype="multipart/form-data" action="/wp-json/wp/v2/product?include=1075%2C1118%2C1122%2C1125&#038;_fields=id%2Ctitle%2Ccontent%2Cfeatured_media&#038;per_page=10" data-token="32c795ac4ba59bb80a848597eedeb059" data-token-time="1773996084"><noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript><div id="wpforms-error-noscript" style="display: none;">Please enable JavaScript in your browser to complete this form.</div><div class="wpforms-field-container"><div id="wpforms-562-field_1-container" class="wpforms-field wpforms-field-name" data-field-id="1"><label class="wpforms-field-label" for="wpforms-562-field_1">Вашето име <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="text" id="wpforms-562-field_1" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][1]" aria-errormessage="wpforms-562-field_1-error" aria-describedby="wpforms-562-field_1-description" required><div id="wpforms-562-field_1-description" class="wpforms-field-description">Въведете Вашето име</div></div><div id="wpforms-562-field_2-container" class="wpforms-field wpforms-field-number" data-field-id="2"><label class="wpforms-field-label" for="wpforms-562-field_2">Телефон за контакт <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="number" id="wpforms-562-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" step="any" aria-errormessage="wpforms-562-field_2-error" aria-describedby="wpforms-562-field_2-description" required><div id="wpforms-562-field_2-description" class="wpforms-field-description">Въведете телефон за контакт</div></div><div id="wpforms-562-field_3-container" class="wpforms-field wpforms-field-email" data-field-id="3"><label class="wpforms-field-label" for="wpforms-562-field_3">Email <span class="wpforms-required-label" aria-hidden="true">*</span></label><input type="email" id="wpforms-562-field_3" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][3]" spellcheck="false" aria-errormessage="wpforms-562-field_3-error" aria-describedby="wpforms-562-field_3-description" required><div id="wpforms-562-field_3-description" class="wpforms-field-description">Имейл</div></div>		<div id="wpforms-562-field_7-container"
			class="wpforms-field wpforms-field-text"
			data-field-type="text"
			data-field-id="7"
			>
			<label class="wpforms-field-label" for="wpforms-562-field_7" >Моля, отбележете, Вашето</label>
			<input type="text" id="wpforms-562-field_7" class="wpforms-field-medium" name="wpforms[fields][7]" >
		</div>
		<div id="wpforms-562-field_5-container" class="wpforms-field wpforms-field-text" data-field-id="5"><label class="wpforms-field-label" for="wpforms-562-field_5">Относно</label><input type="text" id="wpforms-562-field_5" class="wpforms-field-medium" name="wpforms[fields][5]" aria-errormessage="wpforms-562-field_5-error" aria-describedby="wpforms-562-field_5-description" ><div id="wpforms-562-field_5-description" class="wpforms-field-description">Напишете модел на машина</div></div><div id="wpforms-562-field_4-container" class="wpforms-field wpforms-field-textarea" data-field-id="4"><label class="wpforms-field-label" for="wpforms-562-field_4">Вашето съобщение <span class="wpforms-required-label" aria-hidden="true">*</span></label><textarea id="wpforms-562-field_4" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][4]" aria-errormessage="wpforms-562-field_4-error" aria-describedby="wpforms-562-field_4-description" required></textarea><div id="wpforms-562-field_4-description" class="wpforms-field-description">Напишете съобщение</div></div><div id="wpforms-562-field_6-container" class="wpforms-field wpforms-field-checkbox" data-field-id="6"><fieldset><legend class="wpforms-field-label">Моля, отбележете, преди да продължите.** <span class="wpforms-required-label" aria-hidden="true">*</span></legend><ul id="wpforms-562-field_6" class="wpforms-field-required"><li class="choice-1 depth-1"><input type="checkbox" id="wpforms-562-field_6_1" name="wpforms[fields][6][]" value="Съгласявам се с общите условия и политиката за поверителност на сайта." aria-errormessage="wpforms-562-field_6_1-error" aria-describedby="wpforms-562-field_6-description" required ><label class="wpforms-field-label-inline" for="wpforms-562-field_6_1">Съгласявам се с общите условия и политиката за поверителност на сайта.</label></li></ul><div id="wpforms-562-field_6-description" class="wpforms-field-description">Политиката за поверителност е достъпна в долната част на сайта. С натискане на бутона „Изпрати“, потвърждавам, че съм се запознал/а с нея.
</div></fieldset></div><script>
				( function() {
					const style = document.createElement( 'style' );
					style.appendChild( document.createTextNode( '#wpforms-562-field_7-container { position: absolute !important; overflow: hidden !important; display: inline !important; height: 1px !important; width: 1px !important; z-index: -1000 !important; padding: 0 !important; } #wpforms-562-field_7-container input { visibility: hidden; } #wpforms-conversational-form-page #wpforms-562-field_7-container label { counter-increment: none; }' ) );
					document.head.appendChild( style );
					document.currentScript?.remove();
				} )();
			</script></div><!-- .wpforms-field-container --><div class="wpforms-submit-container" ><input type="hidden" name="wpforms[id]" value="562"><input type="hidden" name="page_title" value=""><input type="hidden" name="page_url" value="https://soland.bg/wp-json/wp/v2/product?include=1075,1118,1122,1125&#038;_fields=id,title,content,featured_media&#038;per_page=10"><input type="hidden" name="url_referer" value=""><button type="submit" name="wpforms[submit]" id="wpforms-submit-562" class="wpforms-submit" data-alt-text="Изпращане" data-submit-text="Изпрати запитване" aria-live="assertive" value="wpforms-submit">Изпрати запитване</button><img loading="lazy" decoding="async" src="https://soland.bg/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg" class="wpforms-submit-spinner" style="display: none;" width="26" height="26" alt="Loading"></div></form></div>  <!-- .wpforms-container --></td>
<td class="created column-created" data-colname="Date"></td>
</tr>
</tbody>
</table>`,
  },
];
