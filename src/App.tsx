import React, { useState, useEffect } from 'react';
import { Upload, FileImage, Save, FolderOpen } from 'lucide-react';

export default function FanConfigurator() {
  const sizes = [
    '9.0-11',
    '8.5-16',
    '7.5-35',
    '7.5-25',
    '6.5-35',
    '6.5-25'
  ];
  
  const colors = ['白 (White)', '黒 (Black)', '唐木 (Karaki)'];
  
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [baseImages, setBaseImages] = useState({});
  const [frontOverlayImages, setFrontOverlayImages] = useState({});
  const [backOverlayImages, setBackOverlayImages] = useState({});
  const [frontOverlaySettings, setFrontOverlaySettings] = useState({});
  const [backOverlaySettings, setBackOverlaySettings] = useState({});
  const [frontBackgroundColors, setFrontBackgroundColors] = useState({});
  const [backBackgroundColors, setBackBackgroundColors] = useState({});
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const baseResult = await window.storage.get('fan-base-images');
      const frontOverlayResult = await window.storage.get('fan-front-overlay-images');
      const backOverlayResult = await window.storage.get('fan-back-overlay-images');
      const frontSettingsResult = await window.storage.get('fan-front-overlay-settings');
      const backSettingsResult = await window.storage.get('fan-back-overlay-settings');
      const frontBgResult = await window.storage.get('fan-front-background-colors');
      const backBgResult = await window.storage.get('fan-back-background-colors');
      
      if (baseResult && baseResult.value) {
        setBaseImages(JSON.parse(baseResult.value));
      }
      if (frontOverlayResult && frontOverlayResult.value) {
        setFrontOverlayImages(JSON.parse(frontOverlayResult.value));
      }
      if (backOverlayResult && backOverlayResult.value) {
        setBackOverlayImages(JSON.parse(backOverlayResult.value));
      }
      if (frontSettingsResult && frontSettingsResult.value) {
        setFrontOverlaySettings(JSON.parse(frontSettingsResult.value));
      }
      if (backSettingsResult && backSettingsResult.value) {
        setBackOverlaySettings(JSON.parse(backSettingsResult.value));
      }
      if (frontBgResult && frontBgResult.value) {
        setFrontBackgroundColors(JSON.parse(frontBgResult.value));
      }
      if (backBgResult && backBgResult.value) {
        setBackBackgroundColors(JSON.parse(backBgResult.value));
      }
    } catch (error) {
      console.log('データの読み込み:', error);
    }
  };

  const saveData = async () => {
    try {
      await window.storage.set('fan-base-images', JSON.stringify(baseImages));
      await window.storage.set('fan-front-overlay-images', JSON.stringify(frontOverlayImages));
      await window.storage.set('fan-back-overlay-images', JSON.stringify(backOverlayImages));
      await window.storage.set('fan-front-overlay-settings', JSON.stringify(frontOverlaySettings));
      await window.storage.set('fan-back-overlay-settings', JSON.stringify(backOverlaySettings));
      await window.storage.set('fan-front-background-colors', JSON.stringify(frontBackgroundColors));
      await window.storage.set('fan-back-background-colors', JSON.stringify(backBackgroundColors));
      
      setSaveMessage('Saved / 保存しました');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Save failed / 保存に失敗しました');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const getCurrentKey = () => `${selectedSize}_${selectedColor}`;

  const getFrontSettings = () => {
    const key = getCurrentKey();
    return frontOverlaySettings[key] || { scale: 60, x: 50, y: 50 };
  };

  const getBackSettings = () => {
    const key = getCurrentKey();
    return backOverlaySettings[key] || { scale: 60, x: 50, y: 50 };
  };

  const getFrontBackgroundColor = () => {
    const key = getCurrentKey();
    return frontBackgroundColors[key] || '#ffffff';
  };

  const getBackBackgroundColor = () => {
    const key = getCurrentKey();
    return backBackgroundColors[key] || '#ffffff';
  };

  const setFrontBackgroundColor = (color) => {
    const key = getCurrentKey();
    setFrontBackgroundColors(prev => ({
      ...prev,
      [key]: color
    }));
  };

  const setBackBackgroundColor = (color) => {
    const key = getCurrentKey();
    setBackBackgroundColors(prev => ({
      ...prev,
      [key]: color
    }));
  };

  const updateFrontOverlaySetting = (property, value) => {
    const key = getCurrentKey();
    setFrontOverlaySettings(prev => ({
      ...prev,
      [key]: {
        ...getFrontSettings(),
        [property]: value
      }
    }));
  };

  const updateBackOverlaySetting = (property, value) => {
    const key = getCurrentKey();
    setBackOverlaySettings(prev => ({
      ...prev,
      [key]: {
        ...getBackSettings(),
        [property]: value
      }
    }));
  };

  const handleBaseImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBaseImages(prev => ({
          ...prev,
          [getCurrentKey()]: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFrontOverlayImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFrontOverlayImages(prev => ({
          ...prev,
          [getCurrentKey()]: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackOverlayImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackOverlayImages(prev => ({
          ...prev,
          [getCurrentKey()]: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const currentBaseImage = baseImages[getCurrentKey()];
  const currentFrontOverlayImage = frontOverlayImages[getCurrentKey()];
  const currentBackOverlayImage = backOverlayImages[getCurrentKey()];
  const frontSettings = getFrontSettings();
  const backSettings = getBackSettings();
  const frontBgColor = getFrontBackgroundColor();
  const backBgColor = getBackBackgroundColor();

  const colorPalette = [
    '#ffffff', '#f0f0f0', '#d0d0d0', '#808080', '#404040', '#000000', '#ff0000', '#ff6600',
    '#ffcc00', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#6600ff', '#ff00ff', '#ff1493',
    '#ffc0cb', '#ffe4b5', '#e6e6fa', '#b0e0e6', '#98fb98', '#ffdab9', '#8b4513', '#2f4f4f'
  ];

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: "'Yu Gothic', '游ゴシック', YuGothic, 'Hiragino Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    color: '#000000',
    padding: '40px 20px'
  };

  const wrapperStyle = {
    maxWidth: '210mm',
    margin: '0 auto'
  };

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '32px',
          textAlign: 'center',
          letterSpacing: '0.05em'
        }}>
          Customized Fan
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '32px',
          marginBottom: '32px'
        }}>
          <div style={{ backgroundColor: '#f5f5f5', padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '12px',
                letterSpacing: '0.05em'
              }}>
                Size / サイズ
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '8px 12px',
                      border: 'none',
                      backgroundColor: selectedSize === size ? '#000000' : '#ffffff',
                      color: selectedSize === size ? '#ffffff' : '#000000',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: selectedSize === size ? '600' : '400'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '12px',
                letterSpacing: '0.05em'
              }}>
                Rib Color / 骨の色
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      padding: '8px 12px',
                      border: 'none',
                      backgroundColor: selectedColor === color ? '#000000' : '#ffffff',
                      color: selectedColor === color ? '#ffffff' : '#000000',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: selectedColor === color ? '600' : '400'
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '12px',
                letterSpacing: '0.05em'
              }}>
                Base Image (Front & Back) / ベース画像（表裏共通）
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleBaseImageUpload}
                style={{ display: 'none' }}
                id="baseImageUpload"
              />
              <label
                htmlFor="baseImageUpload"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  border: 'none',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                <Upload size={16} />
                Select / 選択
              </label>
            </div>

            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid #dddddd'
            }}>
              <button
                onClick={saveData}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  border: 'none',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                <Save size={16} />
                Save / 保存
              </button>
              <button
                onClick={loadData}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  border: 'none',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                <FolderOpen size={16} />
                Load / 読込
              </button>
            </div>
            
            {saveMessage && (
              <div style={{
                textAlign: 'center',
                padding: '8px',
                marginTop: '12px',
                backgroundColor: '#ffffff',
                fontSize: '12px'
              }}>
                {saveMessage}
              </div>
            )}
          </div>

          <div style={{ backgroundColor: '#f5f5f5', padding: '24px' }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              letterSpacing: '0.05em'
            }}>
              Preview / プレビュー
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Front Preview */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                  Front / 表面
                </h3>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    Background Color / 背景色
                  </label>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(8, 1fr)', 
                    gap: '4px',
                    marginBottom: '8px'
                  }}>
                    {colorPalette.map(color => (
                      <button
                        key={color}
                        onClick={() => setFrontBackgroundColor(color)}
                        style={{
                          width: '24px',
                          height: '24px',
                          backgroundColor: color,
                          border: frontBgColor === color ? '2px solid #000000' : '1px solid #dddddd',
                          cursor: 'pointer',
                          padding: 0
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={frontBgColor}
                    onChange={(e) => setFrontBackgroundColor(e.target.value)}
                    style={{ width: '100%', height: '32px', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    Overlay Image / 重ねる絵
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFrontOverlayImageUpload}
                    style={{ display: 'none' }}
                    id="frontOverlayImageUpload"
                  />
                  <label
                    htmlFor="frontOverlayImageUpload"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      padding: '8px',
                      border: 'none',
                      backgroundColor: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '11px'
                    }}
                  >
                    <FileImage size={14} />
                    Select / 選択
                  </label>
                </div>

                <div style={{
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff',
                  marginBottom: '12px'
                }}>
                  <div style={{ paddingBottom: '100%' }}></div>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {currentBaseImage || currentFrontOverlayImage ? (
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: frontBgColor,
                          zIndex: 0
                        }}></div>
                        {currentFrontOverlayImage && (
                          <img
                            src={currentFrontOverlayImage}
                            alt="Front Overlay"
                            style={{
                              position: 'absolute',
                              objectFit: 'contain',
                              maxWidth: frontSettings.scale + '%',
                              maxHeight: frontSettings.scale + '%',
                              left: frontSettings.x + '%',
                              top: frontSettings.y + '%',
                              transform: 'translate(-50%, -50%)',
                              zIndex: 1
                            }}
                          />
                        )}
                        {currentBaseImage && (
                          <img
                            src={currentBaseImage}
                            alt="Front Base"
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              zIndex: 2
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', color: '#999999', fontSize: '11px' }}>
                        <Upload size={24} style={{ margin: '0 auto 8px' }} />
                        <p>Upload Image</p>
                      </div>
                    )}
                  </div>
                </div>

                {currentFrontOverlayImage && (
                  <div style={{ backgroundColor: '#ffffff', padding: '12px' }}>
                    <p style={{ fontSize: '12px', fontWeight: '600', marginBottom: '12px' }}>
                      Adjust / 調整
                    </p>
                    
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '10px', marginBottom: '4px' }}>
                        Size / サイズ: {frontSettings.scale}%
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={frontSettings.scale}
                        onChange={(e) => updateFrontOverlaySetting('scale', parseInt(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '10px', marginBottom: '4px' }}>
                        X Position / 横位置: {frontSettings.x}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={frontSettings.x}
                        onChange={(e) => updateFrontOverlaySetting('x', parseInt(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '10px', marginBottom: '4px' }}>
                        Y Position / 縦位置: {frontSettings.y}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={frontSettings.y}
                        onChange={(e) => updateFrontOverlaySetting('y', parseInt(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <button
                      onClick={() => {
                        updateFrontOverlaySetting('scale', 60);
                        updateFrontOverlaySetting('x', 50);
                        updateFrontOverlaySetting('y', 50);
                      }}
                      style={{
                        width: '100%',
                        padding: '6px',
                        border: 'none',
                        backgroundColor: '#f5f5f5',
                        cursor: 'pointer',
                        fontSize: '10px'
                      }}
                    >
                      Reset / リセット
                    </button>
                  </div>
                )}
              </div>

              {/* Back Preview */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                  Back / 裏面
                </h3>
                
                <div style={{ marginBottom: '12px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    Background Color / 背景色
                  </label>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(8, 1fr)', 
                    gap: '4px',
                    marginBottom: '8px'
                  }}>
                    {colorPalette.map(color => (
                      <button
                        key={color}
                        onClick={() => setBackBackgroundColor(color)}
                        style={{
                          width: '24px',
                          height: '24px',
                          backgroundColor: color,
                          border: backBgColor === color ? '2px solid #000000' : '1px solid #dddddd',
                          cursor: 'pointer',
                          padding: 0
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={backBgColor}
                    onChange={(e) => setBackBackgroundColor(e.target.value)}
                    style={{ width: '100%', height: '32px', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    Overlay Image / 重ねる絵
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBackOverlayImageUpload}
                    style={{ display: 'none' }}
                    id="backOverlayImageUpload"
                  />
                  <label
                    htmlFor="backOverlayImageUpload"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      padding: '8px',
                      border: 'none',
                      backgroundColor: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '11px'
                    }}
                  >
                    <FileImage size={14} />
                    Select / 選択
                  </label>
                </div>

                <div style={{
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff',
                  marginBottom: '12px'
                }}>
                  <div style={{ paddingBottom: '100%' }}></div>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {currentBaseImage || currentBackOverlayImage ? (
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: backBgColor,
                          zIndex: 0
                        }}></div>
                        {currentBackOverlayImage && (
                          <img
                            src={currentBackOverlayImage}
                            alt="Back Overlay"
                            style={{
                              position: 'absolute',
                              objectFit: 'contain',
                              maxWidth: backSettings.scale + '%',
                              maxHeight: backSettings.scale + '%',
                              left: backSettings.x + '%',
                              top: backSettings.y + '%',
                              transform: 'translate(-50%, -50%)',
                              zIndex: 1
                            }}
                          />
                        )}
                        {currentBaseImage && (
                          <img
                            src={currentBaseImage}
                            alt="Back Base"
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              zIndex: 2
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', color: '#999999', fontSize: '11px' }}>
                        <Upload size={24} style={{ margin: '0 auto 8px' }} />
                        <p>Upload Image</p>
                      </div>
                    )}
                  </div>
                </div>

                {currentBackOverlayImage && (
                  <div style={{ backgroundColor: '#ffffff', padding: '12px' }}>
                    <p style={{ fontSize: '12px', fontWeight: '600', marginBottom: '12px' }}>
                      Adjust / 調整
                    </p>
                    
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '10px', marginBottom: '4px' }}>
                        Size / サイズ: {backSettings.scale}%
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={backSettings.scale}
                        onChange={(e) => updateBackOverlaySetting('scale', parseInt(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '10px', marginBottom: '4px' }}>
                        X Position / 横位置: {backSettings.x}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={backSettings.x}
                        onChange={(e) => updateBackOverlaySetting('x', parseInt(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '10px', marginBottom: '4px' }}>
                        Y Position / 縦位置: {backSettings.y}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={backSettings.y}
                        onChange={(e) => updateBackOverlaySetting('y', parseInt(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <button
                      onClick={() => {
                        updateBackOverlaySetting('scale', 60);
                        updateBackOverlaySetting('x', 50);
                        updateBackOverlaySetting('y', 50);
                      }}
                      style={{
                        width: '100%',
                        padding: '6px',
                        border: 'none',
                        backgroundColor: '#f5f5f5',
                        cursor: 'pointer',
                        fontSize: '10px'
                      }}
                    >
                      Reset / リセット
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#ffffff',
              fontSize: '12px'
            }}>
              <h3 style={{ fontWeight: '600', marginBottom: '8px', fontSize: '13px' }}>
                Current Selection / 選択中
              </h3>
              <p style={{ marginBottom: '4px' }}>Size / サイズ: {selectedSize}</p>
              <p>Rib Color / 骨の色: {selectedColor}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}