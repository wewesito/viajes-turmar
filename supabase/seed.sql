insert into public.leads
  (name, email, destination, departure, style, travel_month, travelers, nights, budget_max, estimated_total, score, preferences, source, status, created_at)
values
  ('Marta Ruiz', 'marta.ruiz@email.com', 'Japon esencial', 'Madrid', 'premium', '2026-10', 2, 12, 7200, 6840, 94, '["vuelos","ryokan","tren"]'::jsonb, 'Comparador web', 'Propuesta enviada', '2026-06-02T08:12:00Z'),
  ('Carlos Medina', 'c.medina@email.com', 'Grecia boutique', 'Barcelona', 'romantico', '2026-09', 2, 8, 3800, 3280, 88, '["vuelos","hotel","ferry"]'::jsonb, 'WhatsApp', 'Pendiente contacto', '2026-06-01T16:42:00Z'),
  ('Ana Robles', 'ana.robles@email.com', 'Costa Rica aventura', 'Madrid', 'familiar', '2026-08', 4, 10, 8000, 7420, 91, '["traslados","familia","naturaleza"]'::jsonb, 'SEO destino', 'Negociacion', '2026-06-01T10:05:00Z'),
  ('Javier Ortega', 'javier.ortega@email.com', 'Egipto cultural', 'Valencia', 'cultural', '2026-11', 2, 7, 3200, 2890, 79, '["crucero","guia","vuelos"]'::jsonb, 'Formulario web', 'Reserva prevista', '2026-05-31T07:31:00Z'),
  ('Lucia Santos', 'lucia.santos@email.com', 'Grecia boutique', 'Madrid', 'boutique', '2026-07', 3, 6, 4500, 4180, 83, '["hotel","experiencias"]'::jsonb, 'Recomendacion', 'Ganado', '2026-05-30T14:20:00Z'),
  ('Sergio Martin', 'sergio.martin@email.com', 'Maldivas luna de miel', 'Madrid', 'romantico', '2026-12', 2, 7, 8500, 7960, 96, '["villa agua","hidroavion","todo incluido"]'::jsonb, 'Landing lunas de miel', 'Propuesta enviada', '2026-05-30T09:47:00Z'),
  ('Elena Castro', 'elena.castro@email.com', 'Disneyland Paris', 'Barcelona', 'familiar', '2026-08', 4, 4, 3600, 3140, 82, '["entradas","hotel","traslados"]'::jsonb, 'Busqueda familias', 'Pendiente contacto', '2026-05-29T15:03:00Z'),
  ('Pablo Navarro', 'pablo.navarro@email.com', 'Italia clasica', 'Malaga', 'cultural', '2026-09', 2, 7, 3400, 2980, 76, '["trenes","hotel centrico","visitas"]'::jsonb, 'Circuitos', 'Negociacion', '2026-05-29T10:44:00Z'),
  ('Irene Molina', 'irene.molina@email.com', 'Tailandia norte y playa', 'Madrid', 'aventura suave', '2026-11', 2, 11, 4800, 4420, 87, '["vuelos","traslados","playa"]'::jsonb, 'Comparador web', 'Reserva prevista', '2026-05-28T18:15:00Z'),
  ('Ramon Vidal', 'ramon.vidal@email.com', 'Riviera Maya familiar', 'Madrid', 'todo incluido', '2026-08', 5, 9, 9000, 8650, 89, '["todo incluido","familia","vuelos"]'::jsonb, 'WhatsApp', 'Propuesta enviada', '2026-05-28T08:22:00Z'),
  ('Noelia Perez', 'noelia.perez@email.com', 'Sri Lanka y Maldivas', 'Barcelona', 'luna de miel', '2026-10', 2, 12, 9800, 9250, 97, '["safari","playa","boutique"]'::jsonb, 'SEO destino', 'Ganado', '2026-05-27T11:18:00Z'),
  ('Beatriz Leon', 'beatriz.leon@email.com', 'Noruega fiordos', 'Madrid', 'naturaleza premium', '2026-09', 2, 8, 5800, 5340, 85, '["fiordos","tren","naturaleza"]'::jsonb, 'Formulario web', 'Pendiente contacto', '2026-05-27T07:50:00Z');

insert into public.analytics_events (name, path, payload, created_at)
values
  ('page_view', '/', '{"count":1284,"demo":true}'::jsonb, '2026-06-02T09:00:00Z'),
  ('quick_tab_selected', '/', '{"count":312,"demo":true}'::jsonb, '2026-06-02T09:05:00Z'),
  ('search_started', '/', '{"count":286,"demo":true}'::jsonb, '2026-06-02T09:10:00Z'),
  ('result_selected', '/', '{"count":119,"demo":true}'::jsonb, '2026-06-02T09:15:00Z'),
  ('proposal_requested', '/', '{"count":54,"demo":true}'::jsonb, '2026-06-02T09:20:00Z'),
  ('whatsapp_click', '/', '{"count":39,"demo":true}'::jsonb, '2026-06-02T09:25:00Z'),
  ('email_click', '/', '{"count":21,"demo":true}'::jsonb, '2026-06-02T09:30:00Z');

insert into public.customers (name, email, phone, preferred_language)
values
  ('Lucia Santos', 'lucia.santos@email.com', '+34 677 451 930', 'es'),
  ('Noelia Perez', 'noelia.perez@email.com', '+34 618 440 311', 'es'),
  ('Marta Ruiz', 'marta.ruiz@email.com', '+34 600 112 430', 'es');

insert into public.proposals (title, destination, status, total, currency, itinerary, conditions, valid_until)
values
  ('Japon premium para 2 viajeros', 'Japon esencial', 'sent', 6840, 'EUR', '["Tokio","Kioto","Ryokan","Alpes japoneses"]'::jsonb, 'Precio orientativo pendiente de disponibilidad final.', '2026-06-15'),
  ('Sri Lanka y Maldivas luna de miel', 'Sri Lanka y Maldivas', 'accepted', 9250, 'EUR', '["Colombo","Triangulo cultural","Safari","Maldivas"]'::jsonb, 'Reserva demo aceptada.', '2026-06-12'),
  ('Grecia boutique con islas', 'Grecia boutique', 'draft', 3280, 'EUR', '["Atenas","Mykonos","Santorini"]'::jsonb, 'Pendiente revision de cupos.', '2026-06-18');

insert into public.payments (provider, provider_payment_id, status, amount, currency)
values
  ('Stripe demo', 'pi_demo_001', 'paid', 980, 'EUR'),
  ('Redsys demo', 'redsys_demo_002', 'paid', 1500, 'EUR'),
  ('Bank link demo', 'bank_demo_003', 'pending', 700, 'EUR');
