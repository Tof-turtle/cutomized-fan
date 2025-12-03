import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Upload, FileImage, Save, FolderOpen } from 'lucide-react';

type ImageMap = Record<string, string>;

interface OverlaySetting {
  scale: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
}

type OverlaySettingsMap = Record<string, OverlaySetting>;
type BackgroundColorMap = Record<string, string>;

export default function FanConfigurator() {
  const sizes = [
    '9.5-10',
    '9.0-11',
    '8.5-16',
    '7.5-45',
    '7.5-35',
    '7.5-25',
    '6.5-35',
    '6.5-25'
  ];

  const colors = ['白 (White)', '黒 (Black)', '唐木 (Karaki)'];
  const printMethodOptions = [
    'Full Color (Single Side) / フルカラー(片面)',
    'Full Color (Double Side) / フルカラー(両面)',
    'Color Pull / 色引き(片面)',
    'Color Pull (Double Side) / 色引き(両面)',
    'Pearl Pull (Single Side) / パール引き(片面)',
    'Pearl Pull (Double Side) / パール引き(両面)',
    'Silk Screen / シルクスクリーン'
  ];
  const boxOptions = ['有 (Yes)', '無 (No)', 'カスタマイズ（有料）(Custom - Paid)'];
  const bagOptions = ['有 (Yes)', '無 (No)', 'カスタマイズ（有料）(Custom - Paid)'];
  const nameOptions = ['有 (Yes)', '無 (No)'];
  const nameColorOptions = ['金 (Gold)', '銀 (Silver)', '黒 (Black)'];
  const nameLocationOptions = ['手の内 (Inside)', '親骨 (Outer Rib)'];

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [printMethods, setPrintMethods] = useState<string[]>([]);
  const [silkScreenColors, setSilkScreenColors] = useState<number>(0);
  const [boxOption, setBoxOption] = useState<string>(boxOptions[0]);
  const [bagOption, setBagOption] = useState<string>(bagOptions[0]);
  const [nameOption, setNameOption] = useState<string>(nameOptions[1]);
  const [nameColor, setNameColor] = useState<string>(nameColorOptions[0]);
  const [nameLocation, setNameLocation] = useState<string>(nameLocationOptions[0]);
  const [customerName, setCustomerName] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [isFrontAdjustOpen, setIsFrontAdjustOpen] = useState<boolean>(true);
  const [isBackAdjustOpen, setIsBackAdjustOpen] = useState<boolean>(true);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState<boolean>(true);
  
  const [baseImages, setBaseImages] = useState<ImageMap>({});
  const [frontOverlayImages, setFrontOverlayImages] = useState<ImageMap>({});
  const [backOverlayImages, setBackOverlayImages] = useState<ImageMap>({});
  const [frontOverlaySettings, setFrontOverlaySettings] = useState<OverlaySettingsMap>({});
  const [backOverlaySettings, setBackOverlaySettings] = useState<OverlaySettingsMap>({});
  const [frontBackgroundColors, setFrontBackgroundColors] = useState<BackgroundColorMap>({});
  const [backBackgroundColors, setBackBackgroundColors] = useState<BackgroundColorMap>({});
  const [saveMessage, setSaveMessage] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const baseResult = localStorage.getItem('fan-base-images');
      const frontOverlayResult = localStorage.getItem('fan-front-overlay-images');
      const backOverlayResult = localStorage.getItem('fan-back-overlay-images');
      const frontSettingsResult = localStorage.getItem('fan-front-overlay-settings');
      const backSettingsResult = localStorage.getItem('fan-back-overlay-settings');
      const frontBgResult = localStorage.getItem('fan-front-background-colors');
      const backBgResult = localStorage.getItem('fan-back-background-colors');
      const quantityResult = localStorage.getItem('fan-quantity');
      const printMethodResult = localStorage.getItem('fan-print-method');
      const silkScreenColorsResult = localStorage.getItem('fan-silk-screen-colors');
      const boxResult = localStorage.getItem('fan-box-option');
      const bagResult = localStorage.getItem('fan-bag-option');
      const nameResult = localStorage.getItem('fan-name-option');
      const nameColorResult = localStorage.getItem('fan-name-color');
      const nameLocationResult = localStorage.getItem('fan-name-location');
      const customerNameResult = localStorage.getItem('fan-customer-name');
      const remarksResult = localStorage.getItem('fan-remarks');

      if (baseResult) setBaseImages(JSON.parse(baseResult));
      if (frontOverlayResult) setFrontOverlayImages(JSON.parse(frontOverlayResult));
      if (backOverlayResult) setBackOverlayImages(JSON.parse(backOverlayResult));
      if (frontSettingsResult) setFrontOverlaySettings(JSON.parse(frontSettingsResult));
      if (backSettingsResult) setBackOverlaySettings(JSON.parse(backSettingsResult));
      if (frontBgResult) setFrontBackgroundColors(JSON.parse(frontBgResult));
      if (backBgResult) setBackBackgroundColors(JSON.parse(backBgResult));
      if (quantityResult) setQuantity(parseInt(quantityResult));
      if (printMethodResult) setPrintMethods(JSON.parse(printMethodResult));
      if (silkScreenColorsResult) setSilkScreenColors(parseInt(silkScreenColorsResult));
      if (boxResult) setBoxOption(boxResult);
      if (bagResult) setBagOption(bagResult);
      if (nameResult) setNameOption(nameResult);
      if (nameColorResult) setNameColor(nameColorResult);
      if (nameLocationResult) setNameLocation(nameLocationResult);
      if (customerNameResult) setCustomerName(customerNameResult);
      if (remarksResult) setRemarks(remarksResult);
    } catch (error) {
      console.log('データの読み込みエラー:', error);
    }
  };

  const saveData = () => {
    try {
      localStorage.setItem('fan-base-images', JSON.stringify(baseImages));
      localStorage.setItem('fan-front-overlay-images', JSON.stringify(frontOverlayImages));
      localStorage.setItem('fan-back-overlay-images', JSON.stringify(backOverlayImages));
      localStorage.setItem('fan-front-overlay-settings', JSON.stringify(frontOverlaySettings));
      localStorage.setItem('fan-back-overlay-settings', JSON.stringify(backOverlaySettings));
      localStorage.setItem('fan-front-background-colors', JSON.stringify(frontBackgroundColors));
      localStorage.setItem('fan-back-background-colors', JSON.stringify(backBackgroundColors));
      localStorage.setItem('fan-quantity', quantity.toString());
      localStorage.setItem('fan-print-method', JSON.stringify(printMethods));
      localStorage.setItem('fan-silk-screen-colors', silkScreenColors.toString());
      localStorage.setItem('fan-box-option', boxOption);
      localStorage.setItem('fan-bag-option', bagOption);
      localStorage.setItem('fan-name-option', nameOption);
      localStorage.setItem('fan-name-color', nameColor);
      localStorage.setItem('fan-name-location', nameLocation);
      localStorage.setItem('fan-customer-name', customerName);
      localStorage.setItem('fan-remarks', remarks);

      setSaveMessage('Saved / 保存しました');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('保存エラー:', error);
      setSaveMessage('Save failed / 保存に失敗しました');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const getCurrentKey = () => `${selectedSize}_${selectedColor}`;

  const togglePrintMethod = (method: string) => {
    setPrintMethods(prev => {
      if (prev.includes(method)) {
        return prev.filter(m => m !== method);
      } else {
        return [...prev, method];
      }
    });
  };

  const getFrontSettings = (): OverlaySetting => {
    const key = getCurrentKey();
    return frontOverlaySettings[key] || { scale: 60, x: 50, y: 50, scaleX: 100, scaleY: 100, rotation: 0 };
  };

  const getBackSettings = (): OverlaySetting => {
    const key = getCurrentKey();
    return backOverlaySettings[key] || { scale: 60, x: 50, y: 50, scaleX: 100, scaleY: 100, rotation: 0 };
  };

  const getFrontBackgroundColor = (): string => {
    const key = getCurrentKey();
    return frontBackgroundColors[key] || '#ffffff';
  };

  const getBackBackgroundColor = (): string => {
    const key = getCurrentKey();
    return backBackgroundColors[key] || '#ffffff';
  };

  const setFrontBackgroundColor = (color: string) => {
    const key = getCurrentKey();
    setFrontBackgroundColors(prev => ({
      ...prev,
      [key]: color
    }));
  };

  const setBackBackgroundColor = (color: string) => {
    const key = getCurrentKey();
    setBackBackgroundColors(prev => ({
      ...prev,
      [key]: color
    }));
  };

  const updateFrontOverlaySetting = (
    property: keyof OverlaySetting,
    value: number
  ) => {
    const key = getCurrentKey();
    const current = getFrontSettings();
    setFrontOverlaySettings(prev => ({
      ...prev,
      [key]: {
        ...current,
        [property]: value
      }
    }));
  };

  const updateBackOverlaySetting = (
    property: keyof OverlaySetting,
    value: number
  ) => {
    const key = getCurrentKey();
    const current = getBackSettings();
    setBackOverlaySettings(prev => ({
      ...prev,
      [key]: {
        ...current,
        [property]: value
      }
    }));
  };

  const handleBaseImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setBaseImages(prev => ({
            ...prev,
            [getCurrentKey()]: result
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFrontOverlayImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setFrontOverlayImages(prev => ({
            ...prev,
            [getCurrentKey()]: result
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackOverlayImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setBackOverlayImages(prev => ({
            ...prev,
            [getCurrentKey()]: result
          }));
        }
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

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: "'Yu Gothic', '游ゴシック', YuGothic, 'Hiragino Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      color: '#000000',
      padding: '20px'
    }}>
 <div className="layout-wrapper" style={{ maxWidth: '1400px', margin: '0 auto' }}>
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '32px',
    flexWrap: 'wrap'
  }}>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="お客様名 / Customer Name"
            style={{
              padding: '8px 16px',
              border: 'none',
              borderBottom: '2px solid #000000',
              fontSize: '14px',
              minWidth: '200px',
              flex: '0 1 auto',
              outline: 'none',
              backgroundColor: 'transparent'
            }}
          />
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            letterSpacing: '0.05em',
            margin: 0
          }}>
            Customized Fan
          </h1>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px'
        }}>
          {/* 左側：設定パネル */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
         
          }}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '24px' }}>
              {/* 開閉ボタン */}
              <button
                onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  marginBottom: '16px',
                  border: 'none',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                <span>Settings / 設定</span>
                <span style={{ fontSize: '18px' }}>{isLeftPanelOpen ? '▼' : '▶'}</span>
              </button>

              {isLeftPanelOpen && (
                <>
                  {/* Print Method */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '12px',
                      letterSpacing: '0.05em'
                    }}>
                      Print Method / 印刷方法
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                      {printMethodOptions.map(method => (
                        <button
                          key={method}
                          onClick={() => togglePrintMethod(method)}
                          style={{
                            padding: '8px 12px',
                            border: 'none',
                            backgroundColor: printMethods.includes(method) ? '#000000' : '#ffffff',
                            color: printMethods.includes(method) ? '#ffffff' : '#000000',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: printMethods.includes(method) ? '600' : '400',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <span style={{ 
                            display: 'inline-block',
                            width: '16px',
                            height: '16px',
                            border: '2px solid ' + (printMethods.includes(method) ? '#ffffff' : '#000000'),
                            backgroundColor: printMethods.includes(method) ? '#ffffff' : 'transparent',
                            position: 'relative'
                          }}>
                            {printMethods.includes(method) && (
                              <span style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: '#000000',
                                fontSize: '12px',
                                fontWeight: 'bold'
                              }}>✓</span>
                            )}
                          </span>
                          {method}
                        </button>
                      ))}
                    </div>

                    {/* シルクスクリーン色数入力 */}
                    {printMethods.some(m => m.includes('Silk Screen')) && (
                      <div style={{ marginTop: '12px' }}>
                        <label style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: '600',
                          marginBottom: '8px'
                        }}>
                          Number of Colors / 色数
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={silkScreenColors}
                          onChange={(e) => setSilkScreenColors(Math.max(0, parseInt(e.target.value) || 0))}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #dddddd',
                            fontSize: '13px'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Size */}
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

                  {/* Rib Color */}
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

              {/* Quantity */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  letterSpacing: '0.05em'
                }}>
                  Quantity / 数量
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #dddddd',
                    fontSize: '13px'
                  }}
                />
              </div>

              {/* Options Section */}
              <div style={{
                marginBottom: '24px',
                paddingTop: '24px',
                borderTop: '2px solid #dddddd'
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  letterSpacing: '0.05em'
                }}>
                  OPTIONS / オプション
                </h3>

                {/* Box */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    箱 / Box
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
                    {boxOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => setBoxOption(option)}
                        style={{
                          padding: '6px 10px',
                          border: 'none',
                          backgroundColor: boxOption === option ? '#000000' : '#ffffff',
                          color: boxOption === option ? '#ffffff' : '#000000',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: boxOption === option ? '600' : '400',
                          textAlign: 'left'
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bag */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    扇子袋 / Fan Bag
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
                    {bagOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => setBagOption(option)}
                        style={{
                          padding: '6px 10px',
                          border: 'none',
                          backgroundColor: bagOption === option ? '#000000' : '#ffffff',
                          color: bagOption === option ? '#ffffff' : '#000000',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: bagOption === option ? '600' : '400',
                          textAlign: 'left'
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name Engraving */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    名入れ / Name Engraving
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {nameOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => setNameOption(option)}
                        style={{
                          padding: '6px 10px',
                          border: 'none',
                          backgroundColor: nameOption === option ? '#000000' : '#ffffff',
                          color: nameOption === option ? '#ffffff' : '#000000',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: nameOption === option ? '600' : '400'
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name Color (only if name engraving is selected) */}
                {nameOption === '有 (Yes)' && (
                  <>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}>
                        名入れ色 / Name Color
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
                        {nameColorOptions.map(option => (
                          <button
                            key={option}
                            onClick={() => setNameColor(option)}
                            style={{
                              padding: '6px 10px',
                              border: 'none',
                              backgroundColor: nameColor === option ? '#000000' : '#ffffff',
                              color: nameColor === option ? '#ffffff' : '#000000',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: nameColor === option ? '600' : '400',
                              textAlign: 'left'
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name Location */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}>
                        名入れ場所 / Name Location
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
                        {nameLocationOptions.map(option => (
                          <button
                            key={option}
                            onClick={() => setNameLocation(option)}
                            style={{
                              padding: '6px 10px',
                              border: 'none',
                              backgroundColor: nameLocation === option ? '#000000' : '#ffffff',
                              color: nameLocation === option ? '#ffffff' : '#000000',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: nameLocation === option ? '600' : '400',
                              textAlign: 'left'
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Base Image Upload */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  letterSpacing: '0.05em'
                }}>
                  Base (Front & Back) / ベース(表裏)
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

              {/* Save/Load Buttons */}
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
            </>
              )}
            </div>

            {/* 右側：プレビューエリア */}
            <div style={{ backgroundColor: '#f5f5f5', padding: '24px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '20px',
                letterSpacing: '0.05em'
              }}>
                Preview / プレビュー
              </h2>

              {/* Current Selection Summary */}
              <div style={{
                marginBottom: '24px',
                padding: '16px',
                backgroundColor: '#ffffff',
                fontSize: '12px'
              }}>
                <h3 style={{ fontWeight: '600', marginBottom: '12px', fontSize: '14px' }}>
                  Current Selection / 選択中
                </h3>
                <p style={{ marginBottom: '6px' }}>Print Method / 印刷方法: <strong>{printMethods.length > 0 ? printMethods.join(', ') : 'None / なし'}</strong></p>
                {printMethods.some(m => m.includes('Silk Screen')) && (
                  <p style={{ marginBottom: '6px', paddingLeft: '12px' }}>└ Number of Colors / 色数: <strong>{silkScreenColors}</strong></p>
                )}
                <p style={{ marginBottom: '6px' }}>Size / サイズ: <strong>{selectedSize}</strong></p>
                <p style={{ marginBottom: '6px' }}>Rib Color / 骨の色: <strong>{selectedColor}</strong></p>
                <p style={{ marginBottom: '6px' }}>Quantity / 数量: <strong>{quantity}</strong></p>
                <p style={{ marginBottom: '6px' }}>箱 / Box: <strong>{boxOption}</strong></p>
                <p style={{ marginBottom: '6px' }}>扇子袋 / Bag: <strong>{bagOption}</strong></p>
                <p style={{ marginBottom: '6px' }}>名入れ / Name: <strong>{nameOption}</strong></p>
                {nameOption === '有 (Yes)' && (
                  <>
                    <p style={{ marginBottom: '6px', paddingLeft: '12px' }}>└ Color / 色: <strong>{nameColor}</strong></p>
                    <p style={{ marginBottom: '6px', paddingLeft: '12px' }}>└ Location / 場所: <strong>{nameLocation}</strong></p>
                  </>
                )}
              </div>

              {/* Remarks */}
              <div style={{
                marginBottom: '24px',
                padding: '16px',
                backgroundColor: '#ffffff',
                fontSize: '12px'
              }}>
                <h3 style={{ fontWeight: '600', marginBottom: '12px', fontSize: '14px' }}>
                  Remarks / 備考
                </h3>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="備考を入力してください / Enter remarks"
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '8px',
                    border: '1px solid #dddddd',
                    fontSize: '12px',
                    fontFamily: "'Yu Gothic', '游ゴシック', YuGothic, 'Hiragino Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '32px'
              }}>
                {/* Front Preview */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                    Front / 表面
                  </h3>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '600',
                      marginBottom: '10px'
                    }}>
                      Background Color / 背景色
                    </label>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(8, 1fr)',
                      gap: '6px',
                      marginBottom: '10px'
                    }}>
                      {colorPalette.map(color => (
                        <button
                          key={color}
                          onClick={() => setFrontBackgroundColor(color)}
                          style={{
                            width: '100%',
                            paddingBottom: '100%',
                            backgroundColor: color,
                            border: frontBgColor === color ? '3px solid #000000' : '1px solid #dddddd',
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
                      onChange={e => setFrontBackgroundColor(e.target.value)}
                      style={{ width: '100%', height: '40px', cursor: 'pointer' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '600',
                      marginBottom: '10px'
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
                        gap: '6px',
                        padding: '10px',
                        border: 'none',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        fontSize: '13px'
                      }}
                    >
                      <FileImage size={16} />
                      Select / 選択
                    </label>
                  </div>

                  <div style={{
                    width: '100%',
                    maxWidth: '600px',
                    margin: '0 auto',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                    marginBottom: '16px'
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
                                transform: `translate(-50%, -50%) scaleX(${frontSettings.scaleX / 100}) scaleY(${frontSettings.scaleY / 100}) rotate(${frontSettings.rotation}deg)`,
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
                        <div style={{
                          textAlign: 'center',
                          color: '#999999',
                          fontSize: '13px'
                        }}>
                          <Upload size={32} style={{ margin: '0 auto 12px' }} />
                          <p>Upload Image</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {currentFrontOverlayImage && (
                    <div style={{ backgroundColor: '#ffffff', padding: '16px', marginBottom: '16px' }}>
                      <button
                        onClick={() => setIsFrontAdjustOpen(!isFrontAdjustOpen)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px',
                          border: 'none',
                          backgroundColor: '#f5f5f5',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        <span>Adjust / 調整</span>
                        <span style={{ fontSize: '18px' }}>{isFrontAdjustOpen ? '▼' : '▶'}</span>
                      </button>

                      {isFrontAdjustOpen && (
                        <div style={{ paddingTop: '16px' }}>
                          <div style={{ marginBottom: '16px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '12px',
                              marginBottom: '6px'
                            }}>
                              Size / サイズ: {frontSettings.scale}%
                            </label>
                            <input
                              type="range"
                              min="10"
                              max="100"
                              value={frontSettings.scale}
                              onChange={e => updateFrontOverlaySetting('scale', parseInt(e.target.value, 10))}
                              style={{ width: '100%' }}
                            />
                          </div>

                          <div style={{ marginBottom: '16px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '12px',
                              marginBottom: '6px'
                            }}>
                              Width Scale / 横幅: {frontSettings.scaleX}%
                            </label>
                            <input
                              type="range"
                              min="10"
                              max="200"
                              value={frontSettings.scaleX}
                              onChange={e => updateFrontOverlaySetting('scaleX', parseInt(e.target.value, 10))}
                              style={{ width: '100%' }}
                            />
                          </div>

                          <div style={{ marginBottom: '16px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '12px',
                              marginBottom: '6px'
                            }}>
                              Height Scale / 縦幅: {frontSettings.scaleY}%
                            </label>
                            <input
                              type="range"
                              min="10"
                              max="200"
                              value={frontSettings.scaleY}
                              onChange={e => updateFrontOverlaySetting('scaleY', parseInt(e.target.value, 10))}
                              style={{ width: '100%' }}
                            />
                          </div>

                          <div style={{ marginBottom: '16px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '12px',
                              marginBottom: '6px'
                            }}>
                              Rotation / 回転: {frontSettings.rotation}°
                            </label>
                            <input
                              type="range"
                              min="-180"
                              max="180"
                              value={frontSettings.rotation}
                              onChange={e => updateFrontOverlaySetting('rotation', parseInt(e.target.value, 10))}
                              style={{ width: '100%' }}
                            />
                          </div>

                          <div style={{ marginBottom: '16px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '12px',
                              marginBottom: '6px'
                            }}>
                              X Position / 横位置: {frontSettings.x}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={frontSettings.x}
                              onChange={e => updateFrontOverlaySetting('x', parseInt(e.target.value, 10))}
                              style={{ width: '100%' }}
                            />
                          </div>

                          <div style={{ marginBottom: '16px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '12px',
                              marginBottom: '6px'
                            }}>
                              Y Position / 縦位置: {frontSettings.y}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={frontSettings.y}
                              onChange={e => updateFrontOverlaySetting('y', parseInt(e.target.value, 10))}
                              style={{ width: '100%' }}
                            />
                          </div>

                          <button
                            onClick={() => {
                              updateFrontOverlaySetting('scale', 60);
                              updateFrontOverlaySetting('scaleX', 100);
                              updateFrontOverlaySetting('scaleY', 100);
                              updateFrontOverlaySetting('rotation', 0);
                              updateFrontOverlaySetting('x', 50);
                              updateFrontOverlaySetting('y', 50);
                            }}
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: 'none',
                              backgroundColor: '#f5f5f5',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Reset / リセット
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Back Preview */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                    Back / 裏面
                  </h3>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '600',
                      marginBottom: '10px'
                    }}>
                      Background Color / 背景色
                    </label>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(8, 1fr)',
                      gap: '6px',
                      marginBottom: '10px'
                    }}>
                      {colorPalette.map(color => (
                        <button
                          key={color}
                          onClick={() => setBackBackgroundColor(color)}
                          style={{
                            width: '100%',
                            paddingBottom: '100%',
                            backgroundColor: color,
                            border: backBgColor === color ? '3px solid #000000' : '1px solid #dddddd',
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
                      onChange={e => setBackBackgroundColor(e.target.value)}
                      style={{ width: '100%', height: '40px', cursor: 'pointer' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '600',
                      marginBottom: '10px'
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
                        gap: '6px',
                        padding: '10px',
                        border: 'none',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        fontSize: '13px'
                      }}
                    >
                      <FileImage size={16} />
                      Select / 選択
                    </label>
                  </div>

                  <div style={{
                    width: '100%',
                    maxWidth: '600px',
                    margin: '0 auto',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                    marginBottom: '16px'
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
                                transform: `translate(-50%, -50%) scaleX(${backSettings.scaleX / 100}) scaleY(${backSettings.scaleY / 100}) rotate(${backSettings.rotation}deg)`,
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
                        <div style={{
                          textAlign: 'center',
                          color: '#999999',
                          fontSize: '13px'
                        }}>
                          <Upload size={32} style={{ margin: '0 auto 12px' }} />
                          <p>Upload Image</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {currentBackOverlayImage && (
                    <div style={{ backgroundColor: '#ffffff', padding: '16px', marginBottom: '16px' }}>
                      <button
                        onClick={() => setIsBackAdjustOpen(!isBackAdjustOpen)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px',
                          border: 'none',
                          backgroundColor: '#f5f5f5',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        <span>Adjust / 調整</span>
                        <span style={{ fontSize: '18px' }}>{isBackAdjustOpen ? '▼' : '▶'}</span>
                      </button>

                      {isBackAdjustOpen && (
                        <div style={{ paddingTop: '16px' }}>
                          <div style={{ marginBottom: '16px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '12px',
                              marginBottom: '6px'
                            }}>
                              Size / サイズ: {backSettings.scale}%
                            </label>
                            <input
                              type="range"
                              min="10"
                              max="100"
                              value={backSettings.scale}
                              onChange={e => updateBackOverlaySetting('scale', parseInt(e.target.value, 10))}
                              style={{ width: '100%' }}
                            />
                          </div>

                          <div style={{ marginBottom: '16px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '12px',
                              marginBottom: '6px'
                            }}>
                              Width Scale / 横幅: {backSettings.scaleX}%
                            </label>
                            <input
                              type="range"
                              min="10"
                              max="200"
                              value={backSettings.scaleX}
                              onChange={e => updateBackOverlaySetting('scaleX', parseInt(e.target.value, 10))}
                              style={{ width: '100%' }}
                            />
                          </div>

                          <div style={{ marginBottom: '16px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '12px',
                              marginBottom: '6px'
                            }}>
                              Height Scale / 縦幅: {backSettings.scaleY}%
                            </label>
                            <input
                              type="range"
                              min="10"
                              max="200"
                              value={backSettings.scaleY}
                              onChange={e => updateBackOverlaySetting('scaleY', parseInt(e.target.value, 10))}
                              style={{ width: '100%' }}
                            />
                          </div>

                          <div style={{ marginBottom: '16px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '12px',
                              marginBottom: '6px'
                            }}>
                              Rotation / 回転: {backSettings.rotation}°
                            </label>
                            <input
                              type="range"
                              min="-180"
                              max="180"
                              value={backSettings.rotation}
                              onChange={e => updateBackOverlaySetting('rotation', parseInt(e.target.value, 10))}
                              style={{ width: '100%' }}
                            />
                          </div>

                          <div style={{ marginBottom: '16px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '12px',
                              marginBottom: '6px'
                            }}>
                              X Position / 横位置: {backSettings.x}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={backSettings.x}
                              onChange={e => updateBackOverlaySetting('x', parseInt(e.target.value, 10))}
                              style={{ width: '100%' }}
                            />
                          </div>

                          <div style={{ marginBottom: '16px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '12px',
                              marginBottom: '6px'
                            }}>
                              Y Position / 縦位置: {backSettings.y}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={backSettings.y}
                              onChange={e => updateBackOverlaySetting('y', parseInt(e.target.value, 10))}
                              style={{ width: '100%' }}
                            />
                          </div>

                          <button
                            onClick={() => {
                              updateBackOverlaySetting('scale', 60);
                              updateBackOverlaySetting('scaleX', 100);
                              updateBackOverlaySetting('scaleY', 100);
                              updateBackOverlaySetting('rotation', 0);
                              updateBackOverlaySetting('x', 50);
                              updateBackOverlaySetting('y', 50);
                            }}
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: 'none',
                              backgroundColor: '#f5f5f5',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Reset / リセット
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          div[style*="gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'"] {
            grid-template-columns: 320px 1fr !important;
          }
        }
        
        @media (min-width: 1024px) {
          div[style*="gridTemplateColumns: '1fr'"][style*="gap: '32px'"] > div:last-child > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body {
            background-color: white !important;
          }
          
          button {
            border: 1px solid #000 !important;
          }
        }
      `}</style>
    </div>
  );
}