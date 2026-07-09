--
-- PostgreSQL database dump
--

\restrict D6pf4lyGqEGGiVA30ngqarJ75NRaqPxS8mtXU6dHPBX0yYdD5fMa1Kcefj6Jv4t

-- Dumped from database version 17.10
-- Dumped by pg_dump version 17.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: authadmin
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    sender_id integer,
    reciever_id integer
);


ALTER TABLE public.messages OWNER TO authadmin;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: authadmin
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO authadmin;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: authadmin
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: authadmin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO authadmin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: authadmin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO authadmin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: authadmin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: authadmin
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: authadmin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: authadmin
--

COPY public.messages (id, message, created_at, sender_id, reciever_id) FROM stdin;
59	Hi Khalil good that you messaged me	2026-07-07 23:23:05.849233	3	1
60	why two time	2026-07-07 23:23:13.421661	3	1
61	I dont know	2026-07-07 23:24:05.466493	1	3
62	everything is alright	2026-07-07 23:24:30.644835	3	1
63	yes	2026-07-07 23:24:37.94239	1	3
64	hi	2026-07-07 23:25:58.656145	1	1
65	as	2026-07-07 23:51:19.42735	1	1
66	word	2026-07-07 23:55:50.563834	1	1
67	I am good	2026-07-07 23:56:09.983678	1	7
68	I am dawer	2026-07-07 23:58:07.003251	3	1
69	OK I am rahman	2026-07-07 23:58:21.11775	1	7
70	I am khalil	2026-07-07 23:59:07.769809	1	3
71	are you up	2026-07-08 00:04:15.69501	1	7
72	and	2026-07-08 00:05:30.942233	1	7
73	That is good	2026-07-08 00:05:49.68002	1	7
74	I am ok	2026-07-08 00:05:54.535534	1	7
75	I will be able to do it 	2026-07-08 00:06:09.475408	1	7
76	ok	2026-07-08 00:06:29.114591	7	1
77	are you up	2026-07-08 00:06:40.719255	7	1
53	Hi Khalil	2026-07-07 00:42:44.186095	7	1
54	How are you rahman	2026-07-07 00:42:53.45293	1	7
55	and you	2026-07-07 00:43:32.689347	7	7
56	HI DAWER I am RAhman	2026-07-07 00:43:55.386607	7	3
57	HI KHalil I am Rahman	2026-07-07 00:44:17.174918	7	1
58	Hi dawer I am Khalil	2026-07-07 00:44:39.306861	1	3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: authadmin
--

COPY public.users (id, username, password) FROM stdin;
1	Khalil	$2b$12$Wr6P4cDCUTV.XWVFBvuHxe82woN75gy5nnReH9MOZ3pHvlTo76QQC
3	Dawer	$2b$12$GxQmU/1Oc4qKekNuNscavOjlA7Wy7UpWkHwPTHSiOQBoFuKVzjn8W
7	Rahman	$2b$12$nuRJg815Vzw/6URS4dlDU.RJPTiDDX2xqeOAuReDA/UUq.hh8CIvO
\.


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: authadmin
--

SELECT pg_catalog.setval('public.messages_id_seq', 77, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: authadmin
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: authadmin
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: authadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: authadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: messages messages_reciever_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: authadmin
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_reciever_id_fkey FOREIGN KEY (reciever_id) REFERENCES public.users(id);


--
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: authadmin
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict D6pf4lyGqEGGiVA30ngqarJ75NRaqPxS8mtXU6dHPBX0yYdD5fMa1Kcefj6Jv4t

