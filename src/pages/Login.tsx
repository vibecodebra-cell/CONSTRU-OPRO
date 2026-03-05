import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../integrations/supabase/client';
import { Hammer } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6">
      <div className="w-full max-w-[420px] bg-surface border border-rim rounded-r-xl p-8 shadow-pop">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="bg-amber p-3 rounded-xl shadow-amber-glow">
            <Hammer className="w-8 h-8 text-black" strokeWidth={3} />
          </div>
          <h1 className="font-montserrat font-extrabold text-2xl tracking-tighter text-center">
            CONSTRUTOR <em className="text-amber not-italic">PRO</em>
          </h1>
          <p className="text-t-2 text-sm text-center">Entre para gerenciar suas obras e orçamentos</p>
        </div>

        <Auth
          supabaseClient={supabase}
          providers={[]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#F59E0B',
                  brandAccent: '#D97706',
                  inputBackground: '#181C24',
                  inputText: '#F1F5F9',
                  inputBorder: '#2E3547',
                  inputPlaceholder: '#4B5669',
                }
              }
            },
            className: {
              button: 'font-montserrat font-bold uppercase tracking-wider py-3 rounded-r-md',
              input: 'finput',
              label: 'text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2',
            }
          }}
          theme="dark"
          localization={{
            variables: {
              sign_in: {
                email_label: 'E-mail',
                password_label: 'Senha',
                button_label: 'Entrar',
                loading_button_label: 'Entrando...',
                link_text: 'Já tem uma conta? Entre',
              },
              sign_up: {
                email_label: 'E-mail',
                password_label: 'Senha',
                button_label: 'Criar conta',
                loading_button_label: 'Criando conta...',
                link_text: 'Não tem uma conta? Cadastre-se',
              },
            }
          }}
        />
      </div>
    </div>
  );
};

export default Login;